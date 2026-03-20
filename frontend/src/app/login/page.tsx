"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { loginFormSchema, LoginFormValues } from "@/lib/validations";
import { setAuthTokens } from "@/lib/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await api.post("/auth/login", data);
      const result = response.data.data;

      setAuthTokens(result.accessToken, result.refreshToken);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border px-3 py-2 outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded-lg border px-3 py-2 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}