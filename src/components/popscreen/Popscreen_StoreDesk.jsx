import starIcon from "../../assets/icons/icon_star.svg";
import starIconWhite from "../../assets/icons/icon_star_white.svg";
import backIcon from "../../assets/icons/icon_back.svg";
import personIcon from "../../assets/icons/icon_profile_primary.svg";
import locationIcon from "../../assets/icons/icon_location_primary.svg";
import searchIcon from "../../assets/icons/icon_search.svg";
import thumbsIcon from "../../assets/icons/icon_thumbs_primary.svg";
import menuIcon from "../../assets/icons/icon_menu_primary.svg";
import plusIcon from "../../assets/icons/icon_plus_primary.svg";
import minusIcon from "../../assets/icons/icon_minus_primary.svg";
import moneyIcon from "../../assets/icons/icon_money_primary.svg";
import clockIcon from "../../assets/icons/icon_clock_primary.svg";
import discountIcon from "../../assets/icons/icon_discount_primary.svg";
import backIconWhite from "../../assets/icons/icon_back_white.svg";
import forwardIcon from "../../assets/icons/icon_forward.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Store from "../../pages/Store";
import { CartContext } from "../../providers/CartProvider";
import { PopupContext } from "../../providers/PopupProvider";
import request from "../../util/API";
import LoadingError from "../LoadingError";
import LoadingSpinner from "../LoadingSpinner";
import getImage from "../../util/getImage";
import extractCoords from "../../util/extractCoords";
import MenuList from "../MenuList";
import TextInput from "../TextInput";
import Popscreen_Thanks from "./Popscreen_Thanks";

// Store.jsx for mobile, remaking the view for desktop
export default function Popscreen_StoreDesk() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const carousel = useRef(undefined);
  const desc = useRef(undefined);

  const { cart, setCart } = useContext(CartContext);
  const { popup, setPopup } = useContext(PopupContext);

  const [store, setStore] = useState({
    loading: true,
    data: {},
  });
  const [categories, setCategories] = useState(undefined);
  const [menu, setMenu] = useState({
    loading: false,
    data: [],
  });
  const [reviews, setReviews] = useState({ loading: true, data: [] });

  const [imgIndex, setImgIndex] = useState(0);
  const [descExpand, setDescExpand] = useState({ show: false, expand: false });
  const [catShow, setCatShow] = useState("All");
  const [reviewInput, setReviewInput] = useState({
    show: false,
    content: "",
    stars: 5,
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  async function fetchStore() {
    const response = await request("GET", "/store/" + popscreen.id_store);
    if (!response || response.error) return setStore({ ...store, error: true });

    setStore({ loading: false, data: response });
  }

  async function fetchMenu() {
    const response = await request(
      "GET",
      "/store/" + popscreen.id_store + "/menu"
    );
    if (!response || response.error) return setMenu({ ...menu, error: true });

    setMenu({ loading: false, data: response });
  }

  async function fetchReviews() {
    const response = await request(
      "GET",
      "/store/" + popscreen.id_store + "/review"
    );
    if (!response || response.error)
      return setReviews({ ...reviews, error: true });

    setReviews({ loading: false, data: response });
  }

  async function fetchCategories() {
    const response = await request("GET", "/category");
    if (!response || response.error)
      return setPopup({
        type: "error",
        title: "An Error has Occurred",
        message: "Failed to load product categories",
      });

    setCategories(response.map((r) => r.name));
  }

  useEffect(() => {
    fetchStore();
    fetchMenu();
    fetchCategories();
    fetchReviews();
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const times = [];
    for (let h = currentHour; h <= 18; h++)
      times.push(h === 18 ? "18:00" : `${String(h).padStart(2, "0")}:00`);
    setAvailableTimes(times);
  }, []);

  function handleSetPage(index) {
    if (index === imgIndex) return;

    const imgSize = carousel.current.querySelector("img").clientWidth;

    const steps = index - imgIndex;
    carousel.current.scrollBy({ left: imgSize * steps, behavior: "smooth" });
  }

  async function handleOrder() {
    if (!paymentMethod)
      return setPopup({
        type: "notice",
        title: "Define Payment Method",
        message: "Payment method cannot be empty!",
      });

    const response = await request("POST", "/order", {
      id_store: popscreen.id_store,
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

    // setPopup({
    //   type: "success",
    //   title: "Created New Order",
    //   message: "Successfull created new order transaction",
    //   buttons: [
    //     {
    //       label: "View Order",
    //       onClick: () => navigate("/app/transactions/" + response.id_order),
    //     },
    //     {
    //       label: "All Transactions",
    //       onClick: () => navigate("/app/transactions"),
    //     },
    //   ],
    // });

    setPopscreen({ ...popscreen, element: <Popscreen_Thanks /> });
    setPopup({
      type: "success",
      title: "Created New Order",
      message: "Successfull created new order transaction",
      buttons: [
        {
          label: "View Order",
          onClick: () => navigate("/app/transactions/" + response.id_order),
        },
        {
          label: "All Transactions",
          onClick: () => navigate("/app/transactions"),
        },
      ],
    });
    setCart([]);
  }

  async function handleReview() {
    const response = await request(
      "POST",
      "/store/" + popscreen.id_store + "/review",
      reviewInput
    );
    if (response && response.error)
      return setPopup({
        type: "error",
        title: "An Error Has Occurred",
        message: "Failed to post review. Try again.",
      });

    setPopup({
      type: "success",
      title: "Successfully posted review",
    });
    setStore({ ...store, data: { ...store.data, has_reviewed: true } });
    setReviewInput({ show: false });
    fetchReviews();
  }

  // Carousel handler
  useEffect(() => {
    const el = carousel.current;
    if (!el) return;

    const onSwipe = () => {
      const imgSize = el.querySelector("img").clientWidth;
      setImgIndex(Math.round(el.scrollLeft / imgSize));
    };

    onSwipe();
    el.addEventListener("scroll", onSwipe, { passive: true });
    return () => el.removeEventListener("scroll", onSwipe);
  }, [carousel.current]);

  // Description handler
  useEffect(() => {
    const el = desc.current;
    if (!el) return;

    const maxHeight = 128; // 32 in Tailwind units
    if (el.clientHeight > maxHeight)
      setDescExpand({ show: true, expand: false });
  }, []);

  return (
    <div
      className="w-full h-full grid grid-cols-[1fr_450px] gap-8"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="bg-white rounded-xl p-4 grow-0 overflow-y-auto">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setPopscreen(undefined)}
        >
          <img src={backIcon} />
          <p className="text-(--primary-color) font-bold text-nowrap">
            Viewing Store
          </p>
        </div>

        <div className="h-8"></div>

        {store.loading ? (
          store.error ? (
            <LoadingError onRetry={fetchStore} />
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <div className="w-full grid grid-cols-2 gap-4 resp-storedesk-container">
            <div>
              <div className="storeimg-container rounded-xl overflow-clip">
                <div className="images" ref={carousel}>
                  {store.data.media.map((m) => (
                    <img src={getImage(m)} />
                  ))}
                </div>

                <div className="buttons">
                  {store.data.media.map((m, i) => (
                    <button
                      key={i}
                      className={`${
                        i === imgIndex ? "bg-black" : "bg-gray-300/50"
                      } size-3 rounded-full`}
                      onClick={() => handleSetPage(i)}
                    ></button>
                  ))}
                </div>

                {/* Floating Controls Buttons */}
                {imgIndex === 0 ? null : (
                  <div
                    className="p-2 rounded-full bg-gray-500/80 hover:scale-105 active:bg-gray-500 cursor-pointer absolute left-8 top-[40%]"
                    onClick={() => handleSetPage(imgIndex - 1)}
                  >
                    <img src={backIconWhite} className="size-10" />
                  </div>
                )}
                {imgIndex === store.data.media.length - 1 ? null : (
                  <div
                    className="p-2 rounded-full bg-gray-500/80 hover:scale-105 active:bg-gray-500 cursor-pointer absolute right-8 top-[40%]"
                    onClick={() => handleSetPage(imgIndex + 1)}
                  >
                    <img src={forwardIcon} className="size-10" />
                  </div>
                )}
              </div>

              <div className="w-full p-4 space-y-3">
                <h2 className="text-lg font-bold">{store.data.name}</h2>
                <div
                  className="flex justify-between"
                  //   onClick={() =>
                  //     setPopscreen({
                  //       element: <Popscreen_Reviews />,
                  //       id_store: id_store,
                  //       has_ordered: store.data.has_ordered,
                  //       has_reviewed: store.data.has_reviewed,
                  //     })
                  //   }
                >
                  {store.data.rating ? (
                    <div className="flex items-center gap-1">
                      {[...Array(parseInt(store.data.rating))].map((_, i) => (
                        <img src={starIcon} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-(--primary-color)">
                      Not enough reviews
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <img src={personIcon} />
                  <p>{store.data.username}</p>
                </div>

                <p
                  ref={desc}
                  className={`${
                    descExpand.show && !descExpand.expand
                      ? "max-h-32 overflow-clip"
                      : ""
                  }`}
                >
                  {store.data.description}
                </p>
                {descExpand.show ? (
                  <div
                    className="w-full flex items-center gap-1"
                    onClick={() =>
                      setDescExpand({ show: true, expand: !descExpand.expand })
                    }
                  >
                    <div className="basis-0 grow h-0.5 bg-gray-500"></div>
                    <p className="text-gray-500">
                      Read {descExpand.expand ? "Less" : "More"}
                    </p>
                    <div className="basis-0 grow h-0.5 bg-gray-500"></div>
                  </div>
                ) : null}

                <div className="flex items-top gap-4">
                  <img src={locationIcon} />
                  <p>
                    {!store.data.address.startsWith("pb=")
                      ? store.data.address
                      : `Lat: ${
                          extractCoords(store.data.address.split("pb=")[1]).lat
                        } | Long: ${
                          extractCoords(store.data.address.split("pb=")[1]).lng
                        }`}
                  </p>
                </div>

                <iframe
                  width={"100%"}
                  height={"350px"}
                  style={{ borderRadius: "15px", marginBottom: "1em" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${
                    !store.data.address.startsWith("pb=")
                      ? `${encodeURIComponent(store.data.address)}`
                      : `${
                          extractCoords(store.data.address.split("pb=")[1]).lat
                        },${
                          extractCoords(store.data.address.split("pb=")[1]).lng
                        }`
                  }&z=15&output=embed`}
                ></iframe>

                <p className="font-bold text-lg">
                  Reviews ({reviews.data.length})
                </p>

                {!reviewInput.show ? (
                  <button
                    className="btn primary full"
                    onClick={() => {
                      if (!store.data.has_ordered)
                        return setPopup({
                          type: "notice",
                          title: "Unauthorized Action",
                          message:
                            "You must make an order at this store to create a review",
                        });

                      setReviewInput({ ...reviewInput, show: true });
                    }}
                  >
                    Add Your Review
                  </button>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-3 w-full p-2 bg-gray-400/45 rounded-md">
                      {[...Array(5)].map((_, i) => (
                        <img
                          src={
                            i <= reviewInput.stars ? starIcon : starIconWhite
                          }
                          onClick={() =>
                            setReviewInput({ ...reviewInput, stars: i + 1 })
                          }
                        />
                      ))}
                    </div>

                    <textarea
                      className="w-full p-2 bg-gray-400/45 placeholder:text-gray-400 text-black min-h-32 outline-0 rounded-md"
                      placeholder="Describe your experience"
                      value={reviewInput.content}
                      onChange={(e) =>
                        setReviewInput({
                          ...reviewInput,
                          content: e.target.value,
                        })
                      }
                    ></textarea>

                    <div className="w-full grid grid-cols-2 gap-4">
                      {!store.data.has_reviewed ? (
                        <button
                          className="btn smaller primary full mt-4"
                          onClick={handleReview}
                        >
                          Add Your Review
                        </button>
                      ) : null}
                      <button
                        className="btn smaller red full mt-4"
                        onClick={() =>
                          setReviewInput({ ...reviewInput, show: false })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {reviews.loading ? (
                  reviews.error ? (
                    <LoadingError onRetry={fetchReviews} />
                  ) : (
                    <LoadingSpinner />
                  )
                ) : (
                  <ul className="space-y-3">
                    {reviews.data.length > 0 ? (
                      reviews.data.map((r) => (
                        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
                          <div className="flex items-center gap-1 w-full">
                            {[...Array(r.stars)].map((_, i) => (
                              <img key={i} src={starIcon} />
                            ))}
                          </div>
                          <p className="text-md">"{r.content}"</p>
                          <p className="text-gray-500/80 text-xs">
                            {r.username}
                          </p>
                        </li>
                      ))
                    ) : (
                      <p className="font-bold text-center text-(--primary-color)">
                        No reviews yet. Be the first!
                      </p>
                    )}
                  </ul>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              <h2 className="text-lg font-bold">Order Menu</h2>

              {menu.loading ? (
                menu.error ? (
                  <LoadingError onRetry={fetchMenu} />
                ) : (
                  <LoadingSpinner />
                )
              ) : (
                <>
                  {categories && menu.data ? (
                    <div className="category-selector">
                      <button
                        className={`hover:bg-(--secondary-color) cursor-pointer ${
                          catShow === "All" ? "selected" : ""
                        }`}
                        onClick={() => setCatShow("All")}
                      >
                        Home
                      </button>
                      {categories
                        .filter(
                          (c) =>
                            menu.data.filter((m) => m.category === c).length > 0
                        )
                        .map((c, i) => (
                          <button
                            key={i}
                            className={`hover:bg-(--secondary-color) cursor-pointer ${
                              catShow === c ? "selected" : ""
                            }`}
                            onClick={() => setCatShow(c)}
                          >
                            {c}
                          </button>
                        ))}
                    </div>
                  ) : null}

                  <TextInput
                    placeholder={"Find menu"}
                    img={searchIcon}
                    customStyle={"bg-white border-2 border-(--primary-color)"}
                  />

                  <div className="flex items-center gap-4">
                    <img src={thumbsIcon} />
                    <p>Best Selling Menu</p>
                  </div>

                  {catShow === "All" ? (
                    <>
                      {menu.loading ? (
                        menu.error ? (
                          <LoadingError onRetry={fetchMenu} />
                        ) : (
                          <LoadingSpinner />
                        )
                      ) : (
                        <MenuList
                          menuItems={menu.data.filter((m) => m.best_seller)}
                          cart={cart}
                          setCart={setCart}
                          idStore={popscreen.id_store}
                        />
                      )}

                      <div className="flex items-center gap-4">
                        <img src={menuIcon} />
                        <p>All Menu</p>
                      </div>

                      {menu.loading ? (
                        menu.error ? (
                          <LoadingError />
                        ) : (
                          <LoadingSpinner />
                        )
                      ) : (
                        <MenuList
                          menuItems={menu.data}
                          cart={cart}
                          setCart={setCart}
                          idStore={popscreen.id_store}
                        />
                      )}
                    </>
                  ) : menu.loading ? (
                    menu.error ? (
                      <LoadingError />
                    ) : (
                      <LoadingSpinner />
                    )
                  ) : (
                    <MenuList
                      menuItems={menu.data.filter(
                        (m) => m.category === catShow
                      )}
                      cart={cart}
                      setCart={setCart}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl p-4 grow-0 overflow-y-auto">
        <p className="font-bold text-lg">Order Checkout</p>

        {cart.filter((c) => c.id_store === popscreen.id_store).length > 0 ? (
          <>
            {/* Order Items */}
            <div className="w-full space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
                <p className="font-bold mb-4">Order Items</p>
                <ul className="w-full space-y-4">
                  {cart
                    .filter((c) => c.id_store === popscreen.id_store)
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
                                className="cursor-pointer"
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
                                className="cursor-pointer"
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
                                  cartCopy.findIndex(
                                    (cp) => cp.id_menu === c.id_menu
                                  )
                                ].notes = e.target.value;

                                return cartCopy;
                              })
                            }
                          ></textarea>
                        </li>
                        {i ===
                        cart.filter((c) => c.id_store === popscreen.id_store)
                          .length -
                          1 ? null : (
                          <div className="w-full h-0.5 bg-gray-500"></div>
                        )}
                      </>
                    ))}
                </ul>
              </div>

              {/* Payment & Pickup */}
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
                {paymentMethod === "WINCOINS" ? (
                  <p className="text-(--primary-color)">
                    Wincoins Balance: 100,000
                  </p>
                ) : null}
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

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-4 w-full space-y-4">
                <p className="font-bold mb-4">Order Summary</p>
                {cart
                  .filter((c) => c.id_store === popscreen.id_store)
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
                        .filter((c) => c.id_store === popscreen.id_store)
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
                        .filter((c) => c.id_store === popscreen.id_store)
                        .reduce((sum, c) => sum + c.price * c.amount, 0)
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Payment</p>
                  <p>
                    {paymentMethod
                      ? paymentMethod.toUpperCase()
                      : "NOT SELECTED"}
                  </p>
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
        ) : (
          <p className="text-center font-bold text-(--primary-color) mt-8">
            You don't have anything in your cart yet
          </p>
        )}
      </div>
    </div>
  );
}
