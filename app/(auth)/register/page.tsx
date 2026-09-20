'use client';

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconArrowRight,
  IconAlertCircle,
  IconCheck,
  IconUser,
  IconUserCircle
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/assets/background/ao-login.webp";
import albionLogo from "@/public/assets/logo/albion_online_logo.svg";
import { createClient } from "@/lib/supabase/client";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManualRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.name.trim(),
            username: formData.username.trim(),
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // If Supabase has email confirmation disabled, session is returned immediately
      if (data.session) {
        setSuccessMessage("Account created successfully! Redirecting...");
        router.push(redirectTo);
        router.refresh();
        return;
      }

      // Attempt immediate sign-in in case email confirmation is turned off on the project
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (signInData.session) {
        setSuccessMessage("Account created! Redirecting to dashboard...");
        router.push(redirectTo);
        router.refresh();
      } else {
        // Fallback message if email confirmation is required by Supabase settings
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
        }, 1200);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred during registration.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    setOauthLoading(provider);
    setErrorMessage("");

    try {
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setOauthLoading(null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `Failed to initialize ${provider} sign up.`;
      setErrorMessage(message);
      setOauthLoading(null);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 brightness-75">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
        <Image
          src={bgImage}
          alt="Albion Online Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Register Container */}
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            {/* Decorative gradient blob */}
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative p-6 sm:p-8 border-4 border-white/30 ">


              {/* Logo / Title Section */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex  w-auto items-center justify-center ">
                  <Image
                    src={albionLogo}
                    alt="Albion Online"
                    width={192}
                    height={192}
                    className="object-cover"
                    priority
                  />

                </div>

                {/* <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Create Account
                </h1> */}

                <p className="mt-2 text-sm text-white/60">
                  Join Albion Game - The All-in-One Gaming Platform
                </p>
              </div>

              {/* Status Messages */}
              {errorMessage && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                  <IconAlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                  <IconCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                  <span className="leading-relaxed">{successMessage}</span>
                </div>
              )}

              {/* Quick Social OAuth Buttons */}
              <div className="grid grid-cols-2 gap-2 space-y-2 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={isLoading || oauthLoading !== null}
                  className="w-full gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  {oauthLoading === "google" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <IconBrandGoogle size={18} className="text-red-500" />
                  )}
                  <span>Google</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuthLogin("facebook")}
                  disabled={isLoading || oauthLoading !== null}
                  className="w-full gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  {oauthLoading === "facebook" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <IconBrandFacebook size={18} className="text-blue-400" />
                  )}
                  <span>Facebook</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#121620] px-3 py-0.5 rounded-full border border-white/10 text-white/50">
                    Or register with email
                  </span>
                </div>
              </div>

              {/* Register Form */}
              <form onSubmit={handleManualRegister} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <IconUser size={16} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <IconUserCircle size={16} />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <IconMail size={16} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="player@albion.com"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <IconLock size={16} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password (min 6 characters)"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || oauthLoading !== null}
                  className="w-full gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold py-2.5 mt-2 transition-all shadow-lg shadow-amber-600/30"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <IconArrowRight size={16} />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-white/60">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}