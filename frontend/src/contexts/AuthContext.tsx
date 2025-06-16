import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

interface AuthCtx {
  token: string | null;
  setToken: (t: string | null) => void;
  successMsg: string;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTok] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (token) {
      const user = jwtDecode<MyJwtPayload>(token);
      setUserId(user.id);
    }
  }, [token]);

  const setToken = (t: string | null) => {
    t ? localStorage.setItem("token", t) : localStorage.removeItem("token");
    setTok(t);
  };

  return (
    <Ctx.Provider
      value={{
        token,
        setToken,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        userId,
        setUserId,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export const useAuth = () => useContext(Ctx);
