import walletIcon from "../../assets/icons/icon_wallet.svg";

import { useContext } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";

export default function Popscreen_Topup() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const topupAmounts = [10000, 20000, 50000, 100000];

  return (
    <div
      className="w-full max-w-[700px] p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        Top-Up Wincoins
      </h2>
      <p className="text-sm text-gray-500/80 text-center">
        Select top-up amount
      </p>

      <ul className="w-full py-4 grid grid-cols-2 gap-4">
        {topupAmounts.map((a, i) => (
          <li
            className="rounded-md bg-(--primary-color) text-white pt-4 cursor-pointer"
            key={i}
          >
            <div className="flex justify-evenly items-center mb-4">
              <img src={walletIcon} />
              <p>{Intl.NumberFormat().format(a)}</p>
            </div>
            <div className="bg-(--secondary-color) h-2 rounded-bl-md rounded-br-md"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
