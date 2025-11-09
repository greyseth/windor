import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import request from "../../util/API";
import getImage from "../../util/getImage";
import LoadingError from "../LoadingError";
import LoadingSpinner from "../LoadingSpinner";

export default function Popscreen_Coupon() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const [coupon, setCoupon] = useState({ loading: true, data: {} });

  async function fetchCoupon() {
    const response = await request("GET", "/coupon/" + popscreen.id_coupon);
    if (!response || response.error)
      return setCoupon({ ...coupon, error: true });

    setCoupon({ loading: false, data: response });
  }

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <div
      className="w-full p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center mb-4">
        Coupon Details
      </h2>

      {coupon.loading ? (
        coupon.error ? (
          <LoadingError onRetry={fetchCoupon} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <img
            src={getImage(coupon.data.filename)}
            className="w-full h-auto aspect-video rounded-lg mb-2"
          />

          <p className="text-lg font-bold text-black">
            {coupon.data.name} - {coupon.data.price} DP
          </p>
          <p className="text-gray-500/80 mb-2">{coupon.data.description}</p>

          <p className="font-bold">Requirements:</p>
          <ul className="list-disc px-4 mb-4">
            <li>Coupon can be purchased with {coupon.data.price} dorpoints</li>
            {coupon.data.min_purchase ? (
              <li>
                Minimum total purchase Rp.{" "}
                {Intl.NumberFormat("en-ID").format(coupon.data.min_purchase)}
              </li>
            ) : null}
            {coupon.data.max_purchase ? (
              <li>
                Maximum total purchase Rp.{" "}
                {Intl.NumberFormat("en-ID").format(coupon.data.max_purchase)}
              </li>
            ) : null}
          </ul>

          <p className="text-center text-(--primary-color)">
            Dorpoints Balance: 50
          </p>
          <button className="btn primary full smaller">Buy Coupon</button>
        </>
      )}
    </div>
  );
}
