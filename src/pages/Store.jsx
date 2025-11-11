import "../assets/css/store.css";

import testImg1 from "../assets/img/img_testing.png";
import testImg2 from "../assets/img/img_testing2.jpg";
import testImg3 from "../assets/img/img_testing3.jpg";
import testImg4 from "../assets/img/img_testing4.png";

import backIcon from "../assets/icons/icon_back.svg";
import personIcon from "../assets/icons/icon_profile_primary.svg";
import locationIcon from "../assets/icons/icon_location_primary.svg";
import menuIcon from "../assets/icons/icon_menu_primary.svg";
import thumbsIcon from "../assets/icons/icon_thumbs_primary.svg";
import starIcon from "../assets/icons/icon_star.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import searchIcon from "../assets/icons/icon_search.svg";
import TextInput from "../components/TextInput";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";
import { CartContext } from "../providers/CartProvider";
import ExtraPageContainer from "../components/ExtraPageContainer";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Reviews from "../components/popscreen/Popscreen_Reviews";
import request from "../util/API";
import getImage from "../util/getImage";
import { PopupContext } from "../providers/PopupProvider";
import extractCoords from "../util/extractCoords";
import { MobileContext } from "../providers/MobileProvider";
import MenuList from "../components/MenuList";

export default function Store() {
  const carousel = useRef(undefined);
  const desc = useRef(undefined);

  const { id_store } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);
  const { popup, setPopup } = useContext(PopupContext);
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const [store, setStore] = useState({
    loading: true,
    data: {},
  });
  const [categories, setCategories] = useState(undefined);
  const [menu, setMenu] = useState({
    loading: false,
    data: [],
  });

  const [imgIndex, setImgIndex] = useState(0);
  const [descExpand, setDescExpand] = useState({ show: false, expand: false });
  const [catShow, setCatShow] = useState("All");

  async function fetchStore() {
    const response = await request("GET", "/store/" + id_store);
    if (!response || response.error) return setStore({ ...store, error: true });

    setStore({ loading: false, data: response });
  }

  async function fetchMenu() {
    const response = await request("GET", "/store/" + id_store + "/menu");
    if (!response || response.error) return setMenu({ ...menu, error: true });

    setMenu({ loading: false, data: response });
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
  }, []);

  function handleSetPage(index) {
    if (index === imgIndex) return;

    const imgSize = carousel.current.querySelector("img").clientWidth;

    const steps = index - imgIndex;
    carousel.current.scrollBy({ left: imgSize * steps, behavior: "smooth" });
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
    <>
      {location.pathname
        .split("/app/stores/" + id_store)[1]
        .includes("/checkout") ? (
        <ExtraPageContainer zIndex={50}>
          <Outlet />
        </ExtraPageContainer>
      ) : null}

      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img src={backIcon} onClick={() => navigate("/app/stores")} />
        <h2 className="text-(--primary-color) font-bold">Viewing Store</h2>
        <div></div>
      </div>

      {store.loading ? (
        store.error ? (
          <LoadingError onRetry={fetchStore} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <div className="storeimg-container">
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
          </div>
        </>
      )}

      <div className="w-full p-4 space-y-3">
        {store.loading ? (
          store.error ? (
            <LoadingError onRetry={fetchStore} />
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <>
            <h2 className="text-lg font-bold">{store.data.name}</h2>
            <div
              className="flex justify-between"
              onClick={() =>
                setPopscreen({
                  element: <Popscreen_Reviews />,
                  id_store: id_store,
                  has_ordered: store.data.has_ordered,
                  has_reviewed: store.data.has_reviewed,
                })
              }
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
              <p className="text-sm text-gray-500 underline">
                See Reviews ({store.data.review_count ?? 0})
              </p>
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
              height={"200px"}
              style={{ borderRadius: "15px", marginBottom: "1em" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${
                !store.data.address.startsWith("pb=")
                  ? `${encodeURIComponent(store.data.address)}`
                  : `${extractCoords(store.data.address.split("pb=")[1]).lat},${
                      extractCoords(store.data.address.split("pb=")[1]).lng
                    }`
              }&z=15&output=embed`}
            ></iframe>
          </>
        )}

        <div className="w-full h-0.5 bg-(--primary-color) my-8"></div>

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
                  className={`${catShow === "All" ? "selected" : ""}`}
                  onClick={() => setCatShow("All")}
                >
                  Home
                </button>
                {categories
                  .filter(
                    (c) => menu.data.filter((m) => m.category === c).length > 0
                  )
                  .map((c, i) => (
                    <button
                      key={i}
                      className={`${catShow === c ? "selected" : ""}`}
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
                    <LoadingError />
                  ) : (
                    <LoadingSpinner />
                  )
                ) : (
                  <MenuList
                    menuItems={menu.data.filter((m) => m.best_seller)}
                    cart={cart}
                    setCart={setCart}
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
                menuItems={menu.data.filter((m) => m.category === catShow)}
                cart={cart}
                setCart={setCart}
              />
            )}
          </>
        )}

        <div className="my-32"></div>
      </div>
    </>
  );
}
