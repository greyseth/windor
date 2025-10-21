import { createContext, useState } from "react";

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [loginToken, setLoginToken] = useState("");

  return (
    <LoginContext.Provider value={{ loginToken, setLoginToken }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
