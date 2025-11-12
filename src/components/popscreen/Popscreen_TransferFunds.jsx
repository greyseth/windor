import walletIcon from "../../assets/icons/icon_wallet_primary.svg";
import personIcon from "../../assets/icons/icon_profile_primary.svg";

import { useContext } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import TextInput from "../TextInput";
import LoadingError from "../LoadingError";
import Popscreen_Transfer from "./Popscreen_Transfer";

export default function Popscreen_TransferFunds() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  return (
    <div
      className="w-full max-w-[700px] p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        Transfer to {popscreen.recipient.username}
      </h2>
      <p className="text-sm text-gray-500/80 text-center">Enter Amount</p>

      <div className="my-4"></div>

      <TextInput
        img={walletIcon}
        placeholder={"Rp. 10,000"}
        customStyle={"text-black"}
      />

      <button className="btn primary full smaller mt-4">Send Funds</button>
      <button
        className="btn red full smaller mt-4"
        onClick={() =>
          setPopscreen({ ...popscreen, element: <Popscreen_Transfer /> })
        }
      >
        Cancel
      </button>
    </div>
  );
}
