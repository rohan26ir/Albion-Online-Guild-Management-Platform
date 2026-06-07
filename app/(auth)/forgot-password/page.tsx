'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  IconMail, 
  IconArrowLeft, 
  IconSend, 
  IconCheck, 
  IconAlertCircle,
  IconBrandGoogle,
  IconBrandDiscord
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/assets/background/ao-login.webp";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
          <Image src={bgImage} alt="Background" fill className="object-cover" priority />
        </div>

        {/* Success Card */}
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
              <IconCheck size={32} className="text-green-500" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-sm text-white/60 mb-6">
              {"We've sent a password reset link to"} <span className="font-medium text-white/80">{email}</span>
            </p>

            <div className="space-y-4">
              <Button 
                onClick={handleResend}
                variant="outline"
                className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <IconSend size={16} />
                {"Didn't receive email? Resend"}
              </Button>

              <Link href="/login">
                <Button variant="ghost" className="w-full gap-2 text-white/60 hover:text-white">
                  <IconArrowLeft size={16} />
                  Back to Login
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/40">
              {"Check your spam folder if you don't see the email in your inbox."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
        <Image src={bgImage} alt="Background" fill className="object-cover" priority />
      </div>

      {/* Forgot Password Card */}
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
              <IconMail size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
            <p className="mt-1 text-sm text-white/60">
              {"Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/70">Email Address</label>
              <div className="relative">
                <IconMail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-9 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="player@albion.com"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-400">
                <IconAlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full gap-2 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <IconSend size={14} />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-2 text-xs text-white/40">OR</span>
              </div>
            </div>

            {/* Alternative Login Options */}
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <IconBrandGoogle size={14} />
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <IconBrandDiscord size={14} />
                Continue with Discord
              </Button>
            </div>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-primary transition-colors">
                <IconArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}