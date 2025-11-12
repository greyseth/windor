import { useContext, useEffect, useState } from "react";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import Popscreen_Coupon from "./popscreen/Popscreen_Coupon";
import request from "../util/API";
import getImage from "../util/getImage";
import { PopscreenContext } from "../providers/PopscreenProvider";

export default function RewardsList() {
  const { popscree, setPopscreen } = useContext(PopscreenContext);
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
              className="rounded-xl overflow-clip cursor-pointer hover:scale-105 transition-transform"
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
    </>
  );
}
