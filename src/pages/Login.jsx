import "../assets/css/login.css";
import personIcon from "../assets/icons/icon_profile.svg";
import mailIcon from "../assets/icons/icon_mail.svg";
import lockIcon from "../assets/icons/icon_lock.svg";
import googleIcon from "../assets/icons/icon_google.svg";
import xIcon from "../assets/icons/icon_x.svg";

import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../providers/LoginProvider";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import request from "../util/API";
import { PopupContext } from "../providers/PopupProvider";

export default function Auth() {
  const [formType, setFormType] = useState("login");

  return (
    <>
      {/* Background decors container */}
      <div className="-z-10 fixed left-0 top-0 h-screen w-full">
        {/* Blue circle BG */}
        <div className="blue-circle"></div>
      </div>

      {/* Login Page Content Container */}
      <div className="w-full h-screen flex flex-col justify-between p-8 [&>div]:grow [&>div]:flex [&>div]:flex-col [&>div]:items-stretch [&>div]:justify-center">
        <div>
          {/* TODO: Replace with actual application logo */}
          <h1 className="text-4xl font-bold text-white text-center">WINDOR</h1>
        </div>

        {formType === "login" ? (
          <LoginForm setFormType={setFormType} />
        ) : (
          <RegisterForm setFormType={setFormType} />
        )}
      </div>
    </>
  );
}

function LoginForm({ setFormType }) {
  const { loginToken, setLoginToken } = useContext(LoginContext);
  const { popup, setPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({});
  // const [rememberMe, setRememberMe] = useState(false);

  async function handleLogin() {
    if (!loginInput.email || !loginInput.password)
      return setPopup({
        type: "notice",
        title: "Cannot Complete Operation",
        message: "Email and password cannot be empty",
      });

    const response = await request("POST", "/user/login", loginInput);
    if (!response || response.error) {
      setPopup({
        type: "error",
        title: "Failed to Log In",
        message:
          response.status === 401
            ? "Invalid email/password"
            : "An error has occurred",
      });
      return;
    }

    window.localStorage.setItem("login_token", response.login_token);
    setLoginToken(response.login_token);

    setPopup({
      type: "success",
      title: "Logged In",
      message: "Successfully logged in with " + loginInput.email,
    });

    navigate("/app");
  }

  return (
    <>
      {/* Form inputs */}
      <div className="space-y-4">
        <TextInput
          type={"text"}
          value={loginInput.email}
          placeholder={"Email"}
          onChange={(v) => setLoginInput({ ...loginInput, email: v })}
          img={mailIcon}
          customStyle={``}
        />
        <TextInput
          type={"password"}
          value={loginInput.password}
          placeholder={"Password"}
          onChange={(v) => setLoginInput({ ...loginInput, password: v })}
          img={lockIcon}
          customStyle={``}
        />
      </div>

      {/* Submit */}
      <div>
        {/* <Checkbox
          label={"Remember Me"}
          isChecked={rememberMe}
          onChange={(v) => setRememberMe(v)}
        /> */}
        <button className="btn white mt-4" onClick={handleLogin}>
          LOGIN
        </button>
      </div>

      {/* Alternative Methods */}
      <div style={{ justifyContent: "flex-end" }}>
        <p
          className="text-center underline text-black cursor-pointer select-none"
          onClick={() => setFormType("register")}
        >
          Don't have an account?
        </p>
        <div className="grid grid-cols-[1fr_1fr]">
          <div className="p-2">
            <button className="btn white border-2 w-full">
              <img src={googleIcon} />
            </button>
          </div>
          <div className="p-2">
            <button className="btn white border-2 w-full">
              <img src={xIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function RegisterForm({ setFormType }) {
  const { loginToken, setLoginToken } = useContext(LoginContext);
  const { popup, setPopup } = useContext(PopupContext);

  const [registerInput, setRegisterInput] = useState({});

  async function handleRegister() {
    if (
      !registerInput.username ||
      !registerInput.email ||
      !registerInput.password
    )
      return setPopup({
        type: "notice",
        title: "Cannot Complete Operation",
        message: "All fields must be filled",
      });

    if (registerInput.password.length < 8)
      return setPopup({
        type: "notice",
        title: "Cannot Complete Operation",
        message: "Password cannot be less than 8 characters",
      });

    const response = await request("POST", "/user/register", registerInput);
    if (!response || response.error)
      return setPopup({
        type: "error",
        title: "Failed to Register",
        message: "An error has occurred",
      });

    window.localStorage.setItem("login_token", response.login_token);
    setLoginToken(response.login_token);

    setPopup({
      type: "success",
      title: "Welcome to WINDOR",
      message: "Successfully registered new account",
    });

    // TODO: Navigate to home page
  }

  return (
    <>
      {/* Form inputs */}
      <div className="space-y-4">
        <TextInput
          type={"text"}
          value={registerInput.username}
          placeholder={"Username"}
          onChange={(v) => setLoginInput({ ...registerInput, username: v })}
          img={personIcon}
          customStyle={``}
        />
        <TextInput
          type={"text"}
          value={registerInput.email}
          placeholder={"Email"}
          onChange={(v) => setRegisterInput({ ...registerInput, email: v })}
          img={mailIcon}
          customStyle={``}
        />
        <TextInput
          type={"password"}
          value={registerInput.password}
          placeholder={"Password"}
          onChange={(v) => setRegisterInput({ ...registerInput, password: v })}
          img={lockIcon}
          customStyle={``}
        />
      </div>

      {/* Submit */}
      <div>
        {/* <Checkbox
          label={"Remember Me"}
          isChecked={rememberMe}
          onChange={(v) => setRememberMe(v)}
        /> */}
        <button className="btn white mt-4" onClick={handleRegister}>
          REGISTER
        </button>
      </div>

      {/* Alternative Methods */}
      <div style={{ justifyContent: "flex-end" }}>
        <a
          className="text-center underline text-black cursor-pointer select-none"
          onClick={() => setFormType("login")}
        >
          Already have an account?
        </a>
        <div className="grid grid-cols-[1fr_1fr]">
          <div className="p-2">
            <button className="btn white border-2 w-full">
              <img src={googleIcon} />
            </button>
          </div>
          <div className="p-2">
            <button className="btn white border-2 w-full">
              <img src={xIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
