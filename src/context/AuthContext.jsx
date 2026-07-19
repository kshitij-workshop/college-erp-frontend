import { createContext, useEffect, useState } from "react";
import { me } from "@/api/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const response = await me();

      setUser(response.data.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}