import { API_URL } from "@/utils/dotenv";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setSignIn = (value: boolean) => {
    setisLoggedIn(value);
  };

  const settingUser = (value: any) => {
    setUser(value);
  };

  const signingOut = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: "include",
    }).then(() => {
      setisLoggedIn(false);
      setUser(null);
    });
  };

  const verify = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  // 3. Exponer el estado y funciones
  const contextValue = {
    isLoggedIn,
    user,
    setSignIn,
    settingUser,
    signingOut,
    verify,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
