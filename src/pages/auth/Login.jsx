import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      {/* Top Left Blur */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Bottom Right Blur */}
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Top Right Dots */}
      <div className="absolute right-16 top-16 grid grid-cols-8 gap-3 opacity-25">
        {Array.from({ length: 64 }).map((_, index) => (
          <div
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-blue-400"
          />
        ))}
      </div>

      {/* Bottom Left Dots */}
      <div className="absolute bottom-16 left-16 grid grid-cols-8 gap-3 opacity-20">
        {Array.from({ length: 64 }).map((_, index) => (
          <div
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-blue-400"
          />
        ))}
      </div>

      <LoginForm />
    </div>
  );
}