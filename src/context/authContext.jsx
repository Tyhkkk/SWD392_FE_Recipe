import { createContext, useContext, useState, useEffect } from "react";
import api from "../../src/lib/apiService";

export const AuthContext = createContext(); // Named export for AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/Login/login", { email, password });
      const { token, role, userId, email: userEmail } = response.data;

      const userData = { userId, email: userEmail, role };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/Login/logout");
    } catch (error) {
      console.error("Logout API failed:", error);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
