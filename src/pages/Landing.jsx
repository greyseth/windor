import "../assets/css/landing.css";
import bannerImage from "../assets/img/landing_banner.jpeg";
import testImg1 from "../assets/img/img_testing.png";
import testImg2 from "../assets/img/img_testing2.jpg";
import testImg3 from "../assets/img/img_testing3.jpg";
import promoImg1 from "../assets/img/img_promo_1.png";
import promoImg2 from "../assets/img/img_promo_2.png";
import promoImg3 from "../assets/img/img_promo_3.jpg";

import { useContext, useEffect, useRef } from "react";
import { LoginContext } from "../providers/LoginProvider";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { loginToken, setLoginToken } = useContext(LoginContext);
  const bubblesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const el = bubblesRef.current;
    if (!el) return;

    for (let i = 0; i < el.length; i++) {
      const bubble = el[i];
      setTimeout(() => {
        if (!bubble) return;
        bubble.classList.add("in");
      }, i * 100);
    }
  }, []);

  return (
    <>
      <img
        src={bannerImage}
        className="w-full h-auto aspect-video object-cover"
      />

      <div className="banner-transition">
        <div className="w-full h-auto aspect-video object-cover"></div>
        <div className="gradient"></div>
      </div>

      <div className="w-full p-8 space-y-4">
        <h1 className="text-(--primary-color) font-bold text-xl text-center">
          BRIDGING THE GAP BETWEEN STUDENTS AND ASPIRING UMKM
        </h1>

        <p className="text-(--primary-color) text-center">
          Providing a window for students to have easy access to discover UMKM
          around the UIN area
        </p>

        <div className="h-8"></div>

        <div
          className="bg-(--primary-color) rounded-xl p-4 flex flex-col gap-4 bubble"
          ref={(ref) => (bubblesRef.current[0] = ref)}
        >
          <img
            src={promoImg1}
            className="w-full h-auto aspect-video rounded-lg object-cover"
          />
          <div className="basis-0 grow text-white text-center">
            <p className="font-bold text-xl">ORDER IN ADVANCE</p>
            <p>
              Running late? Place an order for alter and pick up immediately
              after it's done
            </p>
          </div>
        </div>

        <div
          className="bg-(--primary-color) rounded-xl p-4 flex flex-col gap-4 bubble"
          ref={(ref) => (bubblesRef.current[1] = ref)}
        >
          <img
            src={promoImg2}
            className="w-full h-auto aspect-video rounded-lg object-cover"
          />
          <div className="basis-0 grow text-white text-center">
            <p className="font-bold text-xl">EARN EXCLUSIVE REWARDS</p>
            <p>Purchase with Wincoins and redeem rewards using Dorpoints</p>
          </div>
        </div>

        <div
          className="bg-(--primary-color) rounded-xl p-4 flex flex-col gap-4 bubble"
          ref={(ref) => (bubblesRef.current[2] = ref)}
        >
          <img
            src={promoImg3}
            className="w-full h-auto aspect-video rounded-lg object-cover"
          />
          <div className="basis-0 grow text-white text-center">
            <p className="font-bold text-xl">INCREASE YOUR REACH</p>
            <p>
              Promote with Windor and reach a larger audience for your business
            </p>
          </div>
        </div>

        <div className="h-8"></div>

        <button
          className="btn w-full primary"
          onClick={() =>
            navigate(
              window.localStorage.getItem("login_token") ? "/app" : "/auth"
            )
          }
        >
          GET STARTED
        </button>
      </div>
    </>
  );
}
