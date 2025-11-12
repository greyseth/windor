import { useNavigate, useParams } from "react-router-dom";

import backIcon from "../assets/icons/icon_back.svg";
import windorLogo from "../assets/img/img_windorlogo.png";
import { useContext, useEffect, useRef, useState } from "react";
import request from "../util/API";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";
import formatDate from "../util/formatDate";
import extractCoords from "../util/extractCoords";
import { MobileContext } from "../providers/MobileProvider";

export default function Receipt({ idOrder }) {
  const { isMobile, setIsMobile } = useContext(MobileContext);
  const { id_order } = useParams();
  const id_orderRef = useRef(id_order ?? idOrder);
  const navigate = isMobile ? useNavigate() : undefined;

  const [order, setOrder] = useState({ loading: true, data: {} });

  async function fetchOrder() {
    const response = await request("GET", "/order/" + id_orderRef.current);
    if (!response || response.error) return setOrder({ ...order, error: true });

    setOrder({ loading: false, data: response });
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
          <img src={backIcon} onClick={() => navigate("/app/transactions")} />
          <h2 className="text-(--primary-color) font-bold">Viewing Receipt</h2>
          <div></div>
        </div>
      ) : null}

      {order.loading ? (
        order.error ? (
          <LoadingError onRetry={fetchOrder} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <div className="p-4 space-y-4">
            <div className="text-center text-xs">
              <p className="font-bold text-lg">{order.data.store.name}</p>
              <p className="text-gray-500/80">
                {order.data.store.address.startsWith("pb=")
                  ? `Lat: ${
                      extractCoords(order.data.store.address.split("pb=")[1])
                        .lat
                    }| Long: ${
                      extractCoords(order.data.store.address.split("pb=")[1])
                        .lng
                    }`
                  : order.data.store.address}
              </p>
              <p className="text-gray-500/80 ">
                {formatDate(order.data.order_date)} at{" "}
                {order.data.order_schedule}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="border-b-2 border-t-2 border-gray-300/80 p-4 flex justify-between items-center">
              <p>Id Order</p>
              <p>{order.data.id_order}</p>
            </div>

            <div className="border-b-2 border-gray-300/80 p-4 grid grid-cols-3 gap-2 text-left">
              <p>Menu</p>
              <p className="text-center">Qty</p>
              <p className="text-right">Price</p>
              {order.data.menu.map((m, i) => (
                <>
                  <p>{m.name}</p>
                  <p className="text-center">{m.amount}x</p>
                  <p className="text-right">
                    Rp. {Intl.NumberFormat("en-ID").format(m.price)}
                  </p>
                </>
              ))}
            </div>

            <div className="p-4 space-y-4 border-b-2 border-gray-300/80">
              <div className="flex justify-between items-center">
                <p>Subtotal</p>
                <p>
                  Rp.{" "}
                  {Intl.NumberFormat("en-ID").format(
                    order.data.menu.reduce(
                      (sum, c) => sum + c.amount * c.price,
                      0
                    )
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Discount</p>
                <p>30%</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Dorpoints</p>
                <p>+4</p>
              </div>
            </div>

            <div className="p-4 space-y-4 border-b-2 border-gray-300/80">
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p>
                  Rp.{" "}
                  {Intl.NumberFormat("en-ID").format(
                    order.data.menu.reduce(
                      (sum, c) => sum + c.amount * c.price,
                      0
                    )
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Payment</p>
                <p>{order.data.payment_method}</p>
              </div>
            </div>

            <div>
              <h1 className="w-full text-center font-bold text-xl">
                THANK YOU
              </h1>
              <p className="text-center">For purchasing with Windor</p>
              <img src={windorLogo} className="max-w-32 mx-auto" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
