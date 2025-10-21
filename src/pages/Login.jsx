import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../providers/LoginProvider";

export default function Login() {
  const { loginToken, setLoginToken } = useContext(LoginContext);

  const [loginInput, setLoginInput] = useState({});

  return (
    <>
      <p>Login page</p>
    </>
  );
}
