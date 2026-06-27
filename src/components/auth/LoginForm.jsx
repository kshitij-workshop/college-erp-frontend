import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";
import { useLogin } from "@/hooks/useLogin";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signIn(data);
  };

  return (
    <Card className="w-full max-w-lg border-0 shadow-none bg-white/90 backdrop-blur">

      <CardHeader className="space-y-2">

        <CardTitle className="text-3xl font-bold">
          Welcome Back 👋
        </CardTitle>

        <CardDescription>
          Sign in to continue to your dashboard.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* Email */}

          <div className="space-y-2">

            <Label htmlFor="email">
              Email
            </Label>

            <div className="relative">

              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

              <Input
                id="email"
                type="email"
                placeholder="admin@college.com"
                className="h-11 pl-10"
                {...register("email")}
              />

            </div>

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="space-y-2">

            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">

              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 pl-10 pr-10"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>

          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}