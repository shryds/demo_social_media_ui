import { createContext, useEffect, useState } from "react";
import { userMe } from "../API/user";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("Bearer"), "inqyotes");
    userMe()
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setUser(res.data.email.split("@")[0]);
          setIsLoggedIn(true);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  console.log(user, isLoggedIn);
  return (
    <AuthContext value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext>
  );
}

