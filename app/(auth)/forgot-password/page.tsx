'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/assets/background/ao-login.webp";
import albionLogo from "@/public/assets/logo/albion_online_logo.svg";
import { IconAlertCircle, IconCheck, IconMail, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: unknown) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
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

      {/* Container */}
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            {/* Decorative gradient blob */}
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative p-6 sm:p-8 border-4 border-white/30">
              {/* Logo / Title Section */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex w-auto items-center justify-center">
                  <Image
                    src={albionLogo}
                    alt="Albion Online"
                    width={192}
                    height={192}
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-xl font-bold text-white sm:text-2xl mt-4">
                  Password Recovery
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  {isSubmitted
                    ? "Recovery link dispatched"
                    : "Enter your registered email to reset password"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                  <IconAlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {isSubmitted ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <IconCheck size={28} className="text-emerald-400" />
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    We sent a password recovery link to{" "}
                    <span className="font-bold text-white">{email}</span>. Please check your inbox or spam folder.
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <Button
                      type="button"
                      onClick={handleResend}
                      variant="outline"
                      className="w-full gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all"
                    >
                      Send Again
                    </Button>
                    <Link href="/login" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      Back to Login
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="player@albion.com"
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-10 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 mt-2 transition-all shadow-lg shadow-primary/20"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Recovery Link
                        <IconArrowRight size={16} />
                      </>
                    )}
                  </Button>

                  {/* Back to Login Link */}
                  <div className="mt-6 text-center pt-2">
                    <p className="text-sm text-white/60">
                      Remembered your credentials?{" "}
                      <Link
                        href="/login"
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}