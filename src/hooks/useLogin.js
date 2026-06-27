import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login } from "@/api/authApi";
import { useAuth } from "./useAuth";

export function useLogin() {
  const navigate = useNavigate();

  const { loadUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const signIn = async (credentials) => {
    setLoading(true);

    try {
      const response = await login(credentials);

      const auth = response.data.data;

      localStorage.setItem(
        "accessToken",
        auth.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        auth.refreshToken
      );

      await loadUser();

      toast.success("Welcome back!");

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ??
          "Invalid email or password"
      );

      throw error;

    } finally {

      setLoading(false);

    }
  };

  return {
    signIn,
    loading,
  };
}