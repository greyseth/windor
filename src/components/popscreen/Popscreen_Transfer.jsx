import searchIcon from "../../assets/icons/icon_search.svg";
import personIcon from "../../assets/icons/icon_profile_primary.svg";
import checkIcon from "../../assets/icons/icon_check_primary.svg";

import { useContext } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import TextInput from "../TextInput";
import LoadingError from "../LoadingError";
import Popscreen_TransferFunds from "./Popscreen_TransferFunds";

export default function Popscreen_Transfer() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  return (
    <div
      className="w-full p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        Transfer Wincoin Funds
      </h2>
      <p className="text-sm text-gray-500/80 text-center">Select recipient</p>

      <div className="my-4"></div>

      <TextInput
        img={searchIcon}
        placeholder={"Search by username or email"}
        customStyle={"text-black"}
      />

      <li className="bg-white p-2 rounded-md flex items-center gap-4 mt-4">
        <img src={checkIcon} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold">PERSON NAME</p>
          <p className="text-gray-500/80 text-xs">pe****gmail.com</p>
        </div>
      </li>

      <ul className="mt-4 w-full max-h-82 overflow-y-auto rounded-lg p-4 space-y-4 bg-gray-400/45">
        <li className="bg-white p-2 rounded-md flex items-center gap-4">
          <img src={personIcon} />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold">PERSON NAME</p>
            <p className="text-gray-500/80 text-xs">pe****gmail.com</p>
          </div>
        </li>
      </ul>

      <button
        className="btn primary full smaller mt-4"
        onClick={() =>
          setPopscreen({
            element: <Popscreen_TransferFunds />,
            recipient: { username: "PERSON NAME" },
          })
        }
      >
        Send Funds
      </button>
    </div>
  );
}
