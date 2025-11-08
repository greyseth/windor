import plusIcon from "../assets/icons/icon_plus_primary.svg";
import minusIcon from "../assets/icons/icon_minus_primary.svg";
import moneyIcon from "../assets/icons/icon_money_primary.svg";
import clockIcon from "../assets/icons/icon_clock_primary.svg";
import discountIcon from "../assets/icons/icon_discount_primary.svg";

import testImg from "../assets/img/img_testing.png";

import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/icon_back.svg";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../providers/CartProvider";
import { PopupContext } from "../providers/PopupProvider";
import request from "../util/API";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { popup, setPopup } = useContext(PopupContext);

  const { id_store } = useParams();
  const navigate = useNavigate();

  const [availableTimes, setAvailableTimes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    if (cart.filter((c) => c.id_store === id_store).length < 1) {
      navigate("/app/stores/" + id_store);
      return setPopup({
        type: "error",
        title: "Invalid Action",
        message: "Cart is empty",
      });
    }

    const now = new Date();
    const currentHour = now.getHours();
    const times = [];
    for (let h = currentHour; h <= 24; h++) {
      times.push(h === 24 ? "24:00" : `${String(h).padStart(2, "0")}:00`);
    }
    setAvailableTimes(times);
  }, []);

  useEffect(() => {
    if (cart.filter((c) => c.id_store === id_store).length < 1)
      navigate("/app/stores/" + id_store);
  }, [cart]);

  async function handleOrder() {
    const response = await request("POST", "/order", {
      id_store: id_store,
      order_time: !pickupTime
        ? undefined
        : { hour: pickupTime.split(":")[0], minute: pickupTime.split(":")[1] },
      payment: paymentMethod,
      orders: cart,
    });

    if (!response || response.error)
      return setPopup({
        type: "error",
        title: "An Error Occurred",
        message: "Failed to create order. Try again.",
      });

    setPopup({
      type: "success",
      title: "Created New Order",
      message: "Successfull created new order transaction",
    });

    navigate("/app/transactions/" + response.id_order);
    setCart([]);
  }

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img
          src={backIcon}
          onClick={() => navigate("/app/stores/" + id_store)}
        />
        <h2 className="text-(--primary-color) font-bold">Checkout Order</h2>
        <div></div>
      </div>

      <div className="w-full p-4 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
          <p className="font-bold mb-4">Order Items</p>
          <ul className="w-full space-y-4">
            {cart
              .filter((c) => c.id_store === id_store)
              .map((c, i) => (
                <>
                  <li className="w-full grid grid-cols-[1fr_40%]">
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-sm text-gray-500/80">
                        Rp. {Intl.NumberFormat("en-ID").format(c.price)}
                      </p>

                      <div className="my-4"></div>

                      <div className="flex items-center gap-2">
                        <img
                          src={minusIcon}
                          onClick={() =>
                            setCart((prevCart) => {
                              let pc = prevCart.map((item) =>
                                item.id_menu === c.id_menu
                                  ? item.amount === 1
                                    ? null
                                    : { ...item, amount: item.amount - 1 }
                                  : item
                              );

                              pc = pc.filter((i) => i != null);

                              return pc;
                            })
                          }
                        />
                        <p>{c.amount}</p>
                        <img
                          src={plusIcon}
                          onClick={() => {
                            setCart((prevCart) =>
                              prevCart.map((item) =>
                                item.id_menu === c.id_menu
                                  ? { ...item, amount: item.amount + 1 }
                                  : item
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                    <textarea
                      className="p-2 rounded-md bg-gray-200 placeholder:text-gray-800 outline-none text-sm"
                      placeholder="Add Notes..."
                      value={c.notes ?? ""}
                      onChange={(e) =>
                        setCart((prevCart) => {
                          let cartCopy = [...prevCart];
                          cartCopy[
                            cartCopy.findIndex((cp) => cp.id_menu === c.id_menu)
                          ].notes = e.target.value;

                          return cartCopy;
                        })
                      }
                    ></textarea>
                  </li>
                  {i ===
                  cart.filter((c) => c.id_store === id_store).length -
                    1 ? null : (
                    <div className="w-full h-0.5 bg-gray-500"></div>
                  )}
                </>
              ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 w-full space-y-4">
          <p className="font-bold mb-4">Payment & Pickup</p>

          <div className="flex items-center gap-4">
            <img src={moneyIcon} />
            <select
              className="basis-0 grow outline-none"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value={""}>Payment Method</option>
              <option value={"CASH"}>Cash</option>
              <option value={"WINCOINS"}>Wincoins</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <img src={clockIcon} />
            <select
              className="basis-0 grow outline-none"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            >
              <option value={""}>Pick Up Now</option>
              {availableTimes.map((a, i) => (
                <option key={i} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <img src={discountIcon} />
            <select className="basis-0 grow outline-none">
              <option>Apply Coupon</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 w-full space-y-4">
          <p className="font-bold mb-4">Order Summary</p>
          {cart
            .filter((c) => c.id_store === id_store)
            .map((c) => (
              <div className="flex justify-between items-center">
                <p>
                  {c.amount}x {c.name}
                </p>
                <p>Rp. {Intl.NumberFormat("en-ID").format(c.price)}</p>
              </div>
            ))}
          <div className="w-full h-0.5 bg-black"></div>
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>
              Rp.{" "}
              {Intl.NumberFormat("en-ID").format(
                cart
                  .filter((c) => c.id_store === id_store)
                  .reduce((sum, c) => sum + c.price * c.amount, 0)
              )}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>Discount</p>
            <p>Rp. 0</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Dorpoints</p>
            <p>+0</p>
          </div>
          <div className="w-full h-0.5 bg-black"></div>
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>
              Rp.{" "}
              {Intl.NumberFormat("en-ID").format(
                cart
                  .filter((c) => c.id_store === id_store)
                  .reduce((sum, c) => sum + c.price * c.amount, 0)
              )}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p>Payment</p>
            <p>{paymentMethod.toUpperCase()}</p>
          </div>
        </div>

        <p className="text-center text-(--primary-color) mb-0">
          Double check your order before confirming!
        </p>
        <button className="btn primary full" onClick={handleOrder}>
          Confirm Checkout
        </button>
      </div>
    </>
  );
}
