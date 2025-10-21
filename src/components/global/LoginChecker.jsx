import { useContext, useEffect } from "react";
import { LoginContext } from "../../providers/LoginProvider";
import request from "../../util/API";
import { useNavigate } from "react-router-dom";

export default function LoginChecker() {
  const { loginToken, setLoginToken } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("login_token")) handleVerifyToken();
  }, []);

  async function handleVerifyToken() {
    // Verifies validity of login token
    const response = await request("GET", "/user/verify");
    // TODO: implement popup alert system
    if (response && response.error) {
      alert("Invalid login token");
      navigate("/auth");
      return;
    }

    setLoginToken(window.localStorage.getItem("login_token"));
  }
}
