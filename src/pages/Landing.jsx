import { useContext } from "react";
import { LoginContext } from "../providers/LoginProvider";

export default function Landing() {
  const { loginToken, setLoginToken } = useContext(LoginContext);

  return (
    <>
      <p>Hello world</p>
      <p>Welcome to WINDOR</p>
    </>
  );
}
