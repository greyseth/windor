import { useContext } from "react";
import windorLogo from "../../assets/img/img_windorlogo.png";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Popscreen_StoreDesk from "./Popscreen_StoreDesk";
import { useNavigate } from "react-router-dom";

export default function Popscreen_Thanks() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[500px] p-4 rounded-xl bg-white flex flex-col justify-center items-center gap-4"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <img src={windorLogo} />

      <p className="font-bold text-2xl">ORDER SENT</p>
      <p className="text-center">
        Your transaction will be processed by the seller. Thank you for
        purchasing with Windor.
      </p>

      <button
        className="btn primary full"
        onClick={() =>
          setPopscreen({ ...popscreen, element: <Popscreen_StoreDesk /> })
        }
      >
        Order Again
      </button>
    </div>
  );
}
