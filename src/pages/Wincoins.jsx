import backIcon from "../assets/icons/icon_back.svg";
import walletIcon from "../assets/icons/icon_wallet_primary.svg";
import topupIcon from "../assets/icons/icon_topup_primary.svg";
import transferIcon from "../assets/icons/icon_transfer_primary.svg";
import targetIcon from "../assets/icons/icon_target_primary.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Topup from "../components/popscreen/Popscreen_Topup";
import Popscreen_Transfer from "../components/popscreen/Popscreen_Transfer";

export default function Wincoins() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img src={backIcon} onClick={() => navigate("/app")} />
        <h2 className="text-(--primary-color) font-bold">Manage Wincoins</h2>
        <div></div>
      </div>

      <div className="w-full bg-green-600 grid grid-cols-2">
        <div className="p-4">
          <div className="size-full grid grid-rows-[1fr_2px_1fr] gap-2 p-2 rounded-lg bg-white">
            <div className="flex items-center justify-evenly gap-1">
              <img src={walletIcon} className="size-8" />
              <div>
                <p className="font-bold">Wincoins</p>
                <p>100,000</p>
              </div>
            </div>
            <div className="w-full bg-(--primary-color)"></div>
            <div className="flex items-center justify-evenly gap-1">
              <img src={targetIcon} className="size-8" />
              <div>
                <p className="font-bold">Dorpoints</p>
                <p>100</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2">
          <div className="p-4">
            <button
              className="btn bg-white full"
              onClick={() => setPopscreen({ element: <Popscreen_Topup /> })}
            >
              <img src={topupIcon} />
              <p className="text-(--primary-color)">Top Up</p>
            </button>
          </div>
          <div className="p-4">
            <button
              className="btn bg-white full"
              onClick={() => setPopscreen({ element: <Popscreen_Transfer /> })}
            >
              <img src={transferIcon} />
              <p className="text-(--primary-color)">Transfer</p>
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        <h1 className="text-xl font-bold">Exchange Dorpoints</h1>
      </div>
    </>
  );
}
