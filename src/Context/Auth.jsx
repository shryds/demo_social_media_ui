import { createContext, useEffect, useState } from "react";
import { userMe } from "../API/user";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    userMe()
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data.email.split("@")[0]);
          setEmail(res.data.email);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error("Failed to verify session:", err);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <AuthContext
      value={{ user, email, setUser, setEmail, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext>
  );
}

