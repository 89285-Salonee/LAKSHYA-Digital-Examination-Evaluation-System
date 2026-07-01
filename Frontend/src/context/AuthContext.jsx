import React, { createContext, useState, useEffect } from "react";
import { getToken } from "../Component/Service/AdminService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        if (Date.now() < expiry) {
          setIsAuthenticated(true);
          setRole(decoded.authorities?.[0] || null);
        }
      } catch (e) {}
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
