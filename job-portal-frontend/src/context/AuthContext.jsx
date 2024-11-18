import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
        withCredentials: true,
      });
      // Standardize ID field
      setUser({ ...res.data, id: res.data._id });
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loginUser = () => {
    checkAuth();
  };

  const logoutUser = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
