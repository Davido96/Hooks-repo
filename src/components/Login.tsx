import React, { useState } from "react";
import { Mail, Lock, Crown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES, RouteType } from "../routes";

interface LoginProps {
  onNavigate: (route: RouteType) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email);
        console.log("Login successful:", email);
      } else {
        await register(email, password);
        console.log("Registration successful:", email);
      }

      // Navigate to authenticated homepage after successful authentication
      onNavigate(ROUTES.HOMEPAGE);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logo.png"
              alt="Hooks Logo"
              className="w-8 h-8 object-contain mr-2"
              onError={(e) => {
                // Fallback to Crown icon if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <Crown className="text-yellow-400 mr-2 w-8 h-8 hidden" />
            <h1 className="text-3xl font-bold text-gray-800">Hooks</h1>
          </div>
          <p className="text-gray-600">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
