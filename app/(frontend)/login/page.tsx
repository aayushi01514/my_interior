"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify({ email })); // Save user info
        toast.success("Login successful!");
        router.push("/");
      } else {
        const data = await res.json();
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center relative mb-20"
      style={{ backgroundImage: "url('/02.jpg')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/90 p-10 rounded-xl shadow-lg w-96 backdrop-blur"
      >
        <div className="flex justify-center mb-6">
          {/* <img src="/8R PNG.png" alt="8R Studio" className="h-20 w-20" /> */}
          <h1 className="text-2xl font-bold text-gray-800">8R Studio</h1>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative mb-6">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPass ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8B5E3C] text-white py-3 rounded hover:bg-[#734A2F] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{" "}
          <a href="/register" className="font-medium underline">Register</a>
        </p>
      </form>
    </div>
  );
}
