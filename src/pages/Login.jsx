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
import { Link } from "react-router-dom";

export default function Login() {
  const { loginToken, setLoginToken } = useContext(LoginContext);

  const [loginInput, setLoginInput] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      {/* Background decors container */}
      <div className="z-0 fixed left-0 top-0 h-screen w-full">
        {/* Blue circle BG */}
        <div className="blue-circle"></div>
      </div>

      {/* Login Page Content Container */}
      <div className="w-full h-screen flex flex-col justify-between p-8 [&>div]:grow [&>div]:flex [&>div]:flex-col [&>div]:items-stretch [&>div]:justify-center">
        <div>
          {/* TODO: Replace with actual application logo */}
          <h1 className="text-4xl font-bold text-white text-center">WINDOR</h1>
        </div>

        {/* Form inputs */}
        <div className="space-y-4">
          <TextInput
            type={"text"}
            value={loginInput.email}
            placeholder={"Email"}
            onChange={(v) => setLoginInput({ ...loginInput, email: v })}
            img={personIcon}
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
          <Checkbox
            label={"Remember Me"}
            isChecked={rememberMe}
            onChange={(v) => setRememberMe(v)}
          />
          <button className="btn white mt-4">LOGIN</button>
        </div>

        {/* Alternative Methods */}
        <div style={{ justifyContent: "flex-end" }}>
          <Link target="_blank" className="text-center underline text-black">
            Don't have an account?
          </Link>
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
      </div>
    </>
  );
}
