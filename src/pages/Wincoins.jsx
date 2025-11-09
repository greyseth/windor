import backIcon from "../assets/icons/icon_back.svg";
import walletIcon from "../assets/icons/icon_wallet_primary.svg";
import topupIcon from "../assets/icons/icon_topup_primary.svg";
import transferIcon from "../assets/icons/icon_transfer_primary.svg";
import targetIcon from "../assets/icons/icon_target_primary.svg";

import bannerImg from "../assets/img/img_wincoins_banner.jpg";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Topup from "../components/popscreen/Popscreen_Topup";
import Popscreen_Transfer from "../components/popscreen/Popscreen_Transfer";
import request from "../util/API";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";
import getImage from "../util/getImage";
import Popscreen_Coupon from "../components/popscreen/Popscreen_Coupon";

export default function Wincoins() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState({ loading: true, data: [] });

  async function fetchCoupons() {
    const response = await request("GET", "/coupon");
    if (!response || response.error)
      return setCoupons({ ...coupons, error: true });

    setCoupons({ loading: false, data: response });
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img src={backIcon} onClick={() => navigate("/app")} />
        <h2 className="text-(--primary-color) font-bold">Manage Wincoins</h2>
        <div></div>
      </div>

      <div className="w-full grid grid-cols-2 relative">
        <img
          src={bannerImg}
          className="absolute w-full h-full left-0 top-0 -z-1 object-cover"
        />
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
        <p className="text-sm text-gray-500/80 mb-4">
          *Coupons can only be applied to transactions paid using Wincoins
        </p>

        {coupons.loading ? (
          coupons.error ? (
            <LoadingError onRetry={fetchCoupons} />
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <ul className="w-full space-y-4">
            {coupons.data.map((c) => (
              <li
                key={c.id_coupon}
                className="rounded-xl overflow-clip"
                onClick={() =>
                  setPopscreen({
                    element: <Popscreen_Coupon />,
                    id_coupon: c.id_coupon,
                  })
                }
              >
                <img
                  src={getImage(c.filename)}
                  className="w-full h-auto aspect-video -z-10 object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
