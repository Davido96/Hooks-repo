"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

export default function CreatorSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  }); // handle errors and show them
  const [isEmailValid, setIsEmailValid] = useState(false); // confirm password validation
  const [isPwdValid, setIsPwdValid] = useState(false); // confirm password validation

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { signup } = useAuthStore();

  const handlePwdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.length <= 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be less than or equal to 8 characters",
      }));
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain one lowercase, uppercase and a number",
      }));
      return;
    }

    setIsPwdValid(true);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter a valid email",
      }));
      return;
    }

    setIsEmailValid(true);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return toast.error("Kindly fill out all fields");
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        email,
        password,
        password2: confirmPassword,
        user_type: "Creator",
      });

      console.log("Creator registration successful:", email);

      router.push(ROUTES.CREATOR_VERIFICATION_KYC_POLICY);
    } catch (error) {
      console.error("Registration error:", error);
      // toast.error("Something went wrong during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white"
      style={{
        background:
          "linear-gradient(160deg, #FF6B6B 0%, #F17C88 50%, #C44E88 100%)",
      }}
    >
      {/* Header */}
      <header className="absolute top-0 right-0 p-6 z-10">
        <Button
          asChild
          variant="outline"
          className="bg-transparent border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-4 py-2"
        >
          <Link href={ROUTES.HOMEPAGE}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href={ROUTES.HOMEPAGE}
              className="flex items-center justify-center mb-4 gap-3"
            >
              <Image
                width={32}
                height={32}
                src={"/logo.png"}
                alt="Hooks Logo"
              />
              {/* <img src={"/logo.png"} alt="Hooks Logo" /> */}
              <h1 className="text-3xl font-bold text-white">Hooks</h1>
            </Link>
            <p className="text-white/80">Create your Creator account</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Email */}
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50"
                />
              </div>
              {errors.email.trim() && (
                <p className="text-red-500 text-[13px] mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePwdChange}
                  className="pl-10 pr-10 text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password.trim() && (
                <p className="text-red-500 text-[13px] mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                size={20}
              />
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 text-white bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/50"
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading || !isPwdValid || !isEmailValid}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-auto"
            >
              {isLoading ? "Signing Up..." : "Sign Up as Creator"}
            </Button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              className="font-semibold text-white underline hover:text-white/80"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full container mx-auto text-center py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/80">
            <Link
              href={ROUTES.ABOUT}
              className="hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href={ROUTES.FAN_PRIVACY}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={ROUTES.COMMUNITY_GUIDELINES}
              className="hover:text-white transition-colors"
            >
              Guidelines
            </Link>
            <Link
              href={ROUTES.TERMS}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Hooks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
