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

export default function Store() {
  const carousel = useRef(undefined);
  const desc = useRef(undefined);

  const { id_store } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const [store, setStore] = useState({
    loading: true,
    data: {
      name: "This is my store",
      description:
        "This whimsical placeholder description fills space and demonstrates layout when real content is unavailable. It mentions fictional products, friendly service, and a welcoming atmosphere while remaining generic enough to be replaced. Our imaginary shop offers a diverse selection of handcrafted goods, clever gadgets, and thoughtful gifts, presented with clean visuals and concise copy to inspire confidence. Use this realistic but neutral example to preview user flows, test styles, and evaluate spacing without relying on actual store data or imagery today.",
      address: "Earth 1st Yes Over hEre not there",
      rating: 5,
      review_count: 2,
      username: "Benjamin",
      media: [testImg1, testImg2, testImg3, testImg4],
    },
  });
  const [menu, setMenu] = useState({
    loading: false,
    data: [
      {
        id_menu: 1,
        name: "Fried Rice",
        price: 15000,
        category: "Rice",
        best_seller: false,
      },
      {
        id_menu: 2,
        name: "Chicken Katsu",
        price: 28000,
        category: "Chicken",
        best_seller: true,
      },
      {
        id_menu: 3,
        name: "Beef Teriyaki",
        price: 32000,
        category: "Japanese",
        best_seller: false,
      },
      {
        id_menu: 4,
        name: "Mie Goreng",
        price: 18000,
        category: "Noodles",
        best_seller: false,
      },
      {
        id_menu: 5,
        name: "Chicken Satay (5 pcs)",
        price: 22000,
        category: "Chicken",
        best_seller: false,
      },
      {
        id_menu: 6,
        name: "Spicy Ramen",
        price: 30000,
        category: "Noodles",
        best_seller: true,
      },
      {
        id_menu: 7,
        name: "Onigiri (Salmon)",
        price: 12000,
        category: "Japanese",
        best_seller: false,
      },
      {
        id_menu: 8,
        name: "Spring Rolls (3 pcs)",
        price: 9000,
        category: "Snacks",
        best_seller: false,
      },
      {
        id_menu: 9,
        name: "Iced Lemon Tea",
        price: 8000,
        category: "Drinks",
        best_seller: false,
      },
      {
        id_menu: 10,
        name: "Espresso",
        price: 10000,
        category: "Coffee",
        best_seller: false,
      },
      {
        id_menu: 11,
        name: "Mango Sticky Rice",
        price: 25000,
        category: "Dessert",
        best_seller: false,
      },
      {
        id_menu: 12,
        name: "Grilled Corn with Butter",
        price: 7000,
        category: "Snacks",
        best_seller: false,
      },
      {
        id_menu: 13,
        name: "Chicken Curry with Rice",
        price: 35000,
        category: "Rice",
        best_seller: false,
      },
      {
        id_menu: 14,
        name: "Matcha Latte",
        price: 18000,
        category: "Tea",
        best_seller: false,
      },
    ],
  });

  const [imgIndex, setImgIndex] = useState(0);
  const [descExpand, setDescExpand] = useState({ show: false, expand: false });
  const [catShow, setCatShow] = useState("All");

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
  }, []);

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

      <div className="storeimg-container">
        <div className="images" ref={carousel}>
          {store.data.media.map((m) => (
            <img src={m} />
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

      <div className="w-full p-4 space-y-3">
        <h2 className="text-lg font-bold">{store.data.name}</h2>
        <div
          className="flex justify-between"
          onClick={() =>
            setPopscreen({ element: <Popscreen_Reviews />, id_store: id_store })
          }
        >
          <div className="flex items-center gap-1">
            {[...Array(store.data.rating)].map((_, i) => (
              <img src={starIcon} />
            ))}
          </div>
          <p className="text-sm text-gray-500 underline">
            See Reviews ({store.data.review_count})
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
          <p>{store.data.address}</p>
        </div>

        <iframe
          width={"100%"}
          height={"200px"}
          style={{ borderRadius: "15px", marginBottom: "1em" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCchDE8A3_bdJNyqjwh5JkEp4J3IhuvvWw
    &q=Space+Needle,Seattle+WA"
        ></iframe>

        <div className="w-full h-0.5 bg-(--primary-color) my-8"></div>

        <h2 className="text-lg font-bold">Order Menu</h2>

        <div className="category-selector">
          <button className="selected">Home</button>
          <button>Chicken</button>
          <button>Rice</button>
          <button>Noodles</button>
          <button>Snacks</button>
          <button>Japanese</button>
          <button>Drinks</button>
          <button>Tea</button>
          <button>Coffee</button>
        </div>

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
              <MenuList menuItems={menu.data} cart={cart} setCart={setCart} />
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
      </div>
    </>
  );
}

function MenuList({ menuItems, cart, setCart, fetchMenu }) {
  const { id_store } = useParams();

  return (
    <ul>
      {menuItems.length < 1 ? (
        <LoadingError
          message={"Could not find menus"}
          btnMessage={"Refresh"}
          onRetry={fetchMenu}
        />
      ) : (
        menuItems.map((m) => (
          <li
            className="p-4 rounded-lg shadow-md w-full flex gap-4"
            key={m.id_menu}
          >
            <div className="basis-0 grow">
              <p>{m.name}</p>
              <p className="text-sm text-gray-500/70">
                Rp. {Intl.NumberFormat("en-ID").format(m.price)}
              </p>
              <p className="text-sm text-(--primary-color)">{m.category}</p>
            </div>
            <div>
              {!cart.find((c) => c.id_menu === m.id_menu) ? (
                <button
                  className="btn primary rounded text-xs p-1"
                  onClick={() =>
                    setCart((prevCart) => [
                      ...prevCart,
                      { ...m, amount: 1, id_store: id_store },
                    ])
                  }
                >
                  Order
                </button>
              ) : (
                <button
                  className="btn bg-(--tertiary-color) rounded text-xs p-1"
                  onClick={() =>
                    setCart((prevCart) =>
                      prevCart.filter((pc) => pc.id_menu !== m.id_menu)
                    )
                  }
                >
                  Remove
                </button>
              )}
              {m.best_seller ? (
                <img src={thumbsIcon} className="mx-auto" />
              ) : null}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
