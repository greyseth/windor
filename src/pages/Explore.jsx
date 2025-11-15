import { useContext, useEffect, useRef, useState } from "react";
import "../assets/css/explore.css";

import searchIcon from "../assets/icons/icon_search.svg";
import testImage from "../assets/img/img_testing.png";
import bannerImage from "../assets/img/home_banner.jpg";
import StoreItems from "../components/StoreItems";

import TextInput from "../components/TextInput";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ExtraPageContainer from "../components/ExtraPageContainer";
import { CartContext } from "../providers/CartProvider";
import { SearchContext } from "../providers/SearchProvider";
import request from "../util/API";
import { PopupContext } from "../providers/PopupProvider";
import { MobileContext } from "../providers/MobileProvider";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_StoreDesk from "../components/popscreen/Popscreen_StoreDesk";

export default function Explore() {
  const { cart, setCart } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  const { popup, setPopup } = useContext(PopupContext);
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const { isMobile, setIsMobile } = useContext(MobileContext);

  const { id_store } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const exploreContainer = useRef(undefined);

  const [showMiniSearchbar, setShowMiniSearchbar] = useState(false);
  const showMiniSearchbarRef = useRef(showMiniSearchbar);
  const [closingMiniSearchbar, setClosingMiniSearchbar] = useState(false);

  const [categories, setCategories] = useState([]);
  const [noPersonalItems, setNoPersonalItems] = useState(false);

  useEffect(() => {
    showMiniSearchbarRef.current = showMiniSearchbar;
  }, [showMiniSearchbar]);

  useEffect(() => {
    const el = exploreContainer.current;
    if (!el) return;

    const minScroll = 305;
    const onScroll = () => {
      if (el.scrollTop < minScroll) {
        if (showMiniSearchbarRef.current) setClosingMiniSearchbar(true);
      } else {
        setShowMiniSearchbar(true);
        setClosingMiniSearchbar(false);
      }
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const storesListRef = useRef({});
  const fetchSearch = async () => {
    const { stores, setStores } = storesListRef.current;

    const response = await request("POST", "/store/find", search);
    if (!response || response.error)
      return setStores({ ...stores, error: true });
    setStores({ loading: false, data: response });
  };

  useEffect(() => {
    if (closingMiniSearchbar)
      setTimeout(() => setShowMiniSearchbar(false), 500);
    else clearTimeout(() => setShowMiniSearchbar(false));
  }, [closingMiniSearchbar]);

  async function fetchCategories() {
    const response = await request("GET", "/category");
    if (!response)
      return setPopup({
        type: "error",
        title: "An Error Has Occurred",
        message: "Failed to fetch categories list",
        buttons: [
          {
            label: "Retry",
            onClick: () => fetchCategories,
          },
        ],
      });

    setCategories(response);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(
    () =>
      setPopscreen(
        id_store && !isMobile
          ? { element: <Popscreen_StoreDesk />, id_store: id_store }
          : undefined
      ),
    [id_store, isMobile]
  );

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      if (
        !search.query &&
        !search.id_category &&
        !search.min_rating &&
        !search.max_price
      )
        navigate("/app/stores");
      else fetchSearch();
    }

    if (search.id_category || search.min_rating || search.max_price) {
      navigate("/app/stores/search");
    }
  }, [search.query, search.id_category, search.min_rating, search.max_price]);

  return (
    <>
      {location.pathname.split("/app/stores")[1].includes("/") && isMobile ? (
        <ExtraPageContainer>
          <Outlet />
        </ExtraPageContainer>
      ) : null}

      {isMobile &&
      !location.pathname.includes("/checkout") &&
      id_store &&
      cart.filter((c) => c.id_store === id_store).length > 0 ? (
        <div className="checkout">
          <button
            className="btn w-full primary rounded-full flex-col gap-0.5"
            onClick={() => {
              if (id_store) navigate("/app/stores/" + id_store + "/checkout");
            }}
          >
            <p className="text-center text-xs">
              {cart.filter((c) => c.id_store === id_store).length} Items - Rp.{" "}
              {Intl.NumberFormat("en-ID").format(
                cart
                  .filter((c) => c.id_store === id_store)
                  .reduce((sum, c) => sum + c.price * c.amount, 0)
              )}
            </p>
            <p>Proceed to Checkout</p>
          </button>
        </div>
      ) : null}

      <div
        className="w-full h-full overflow-y-auto overflow-visible"
        id="explore-container"
        ref={exploreContainer}
      >
        {showMiniSearchbar && isMobile ? (
          <MiniSearchbar closing={closingMiniSearchbar} />
        ) : null}

        {isMobile ? (
          <>
            <div className="search-bar">
              <img src={bannerImage} />
              <div>
                <TextInput
                  placeholder={"Search vendors"}
                  img={searchIcon}
                  customStyle={
                    "bg-white border-2 border-(--primary-color) !text-black"
                  }
                  value={search.query}
                  onChange={(v) => setSearch({ ...search, query: v })}
                  onEnter={() => navigate("/app/stores/search")}
                />
                <div className="filters">
                  <select
                    className="dropdown text-center"
                    value={search.id_category}
                    onChange={(e) =>
                      setSearch({ ...search, id_category: e.target.value })
                    }
                  >
                    {categories.length < 1 ? (
                      <option>Loading Categories...</option>
                    ) : categories ? (
                      <>
                        <option key={0} value={""}>
                          All Categories
                        </option>
                        {categories.map((c) => (
                          <option key={c.id_category} value={c.id_category}>
                            {c.name}
                          </option>
                        ))}
                      </>
                    ) : null}
                  </select>
                  <select
                    className="dropdown"
                    value={search.min_rating}
                    onChange={(e) =>
                      setSearch({ ...search, min_rating: e.target.value })
                    }
                  >
                    <option value={""}>All Ratings</option>
                    <option value={5}>⭐ &gt; 5</option>
                    <option value={4}>⭐ &gt; 4</option>
                    <option value={3}>⭐ &gt; 3</option>
                  </select>
                  <select
                    className="dropdown"
                    value={search.max_price}
                    onChange={(e) =>
                      setSearch({ ...search, max_price: e.target.value })
                    }
                  >
                    <option value={""}>All Prices</option>
                    <option value={30000}>&lt; 30,000</option>
                    <option value={20000}>&lt; 20,000</option>
                    <option value={15000}>&lt; 15,000</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="w-full p-4">
              <img
                src={bannerImage}
                className="w-[80%] h-[200px] mx-auto object-cover rounded-xl shadow-xl"
              />
              <div className="w-[80%] p-2 mt-4 mx-auto flex items-center justify-between gap-4 [&>select]:text-center [&>select]:w-full">
                <select
                  className="dropdown text-center"
                  value={search.id_category}
                  onChange={(e) =>
                    setSearch({ ...search, id_category: e.target.value })
                  }
                >
                  {categories.length < 1 ? (
                    <option>Loading Categories...</option>
                  ) : categories ? (
                    <>
                      <option key={0} value={""}>
                        All Categories
                      </option>
                      {categories.map((c) => (
                        <option key={c.id_category} value={c.id_category}>
                          {c.name}
                        </option>
                      ))}
                    </>
                  ) : null}
                </select>
                <select
                  className="dropdown"
                  value={search.min_rating}
                  onChange={(e) =>
                    setSearch({ ...search, min_rating: e.target.value })
                  }
                >
                  <option value={""}>All Ratings</option>
                  <option value={5}>⭐ &gt; 5</option>
                  <option value={4}>⭐ &gt; 4</option>
                  <option value={3}>⭐ &gt; 3</option>
                </select>
                <select
                  className="dropdown"
                  value={search.max_price}
                  onChange={(e) =>
                    setSearch({ ...search, max_price: e.target.value })
                  }
                >
                  <option value={""}>All Prices</option>
                  <option value={30000}>&lt; 30,000</option>
                  <option value={20000}>&lt; 20,000</option>
                  <option value={15000}>&lt; 15,000</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {!noPersonalItems && window.localStorage.getItem("login_token") ? (
          isMobile ? (
            <StoreItems
              fetch={async (stores, setStores) => {
                const response = await request(
                  "POST",
                  "/store/find/personal",
                  {}
                );
                if (!response || response.error)
                  return setStores({ ...stores, error: true });

                if (response.length < 1) return setNoPersonalItems(true);
                setStores({ loading: false, data: response });
              }}
              label={"Based on your recent orders"}
              style={"long"}
            />
          ) : !location.pathname.includes("/search") ? (
            <StoreItems
              fetch={async (stores, setStores) => {
                const response = await request(
                  "POST",
                  "/store/find/personal",
                  {}
                );
                if (!response || response.error)
                  return setStores({ ...stores, error: true });

                if (response.length < 1) return setNoPersonalItems(true);
                setStores({ loading: false, data: response });
              }}
              label={"Based on your recent orders"}
              style={"square"}
            />
          ) : null
        ) : null}

        {isMobile ? (
          <StoreListContent />
        ) : location.pathname.includes("/search") ? (
          <StoreItems
            fetch={async (stores, setStores) => {
              storesListRef.current = { stores, setStores };
              fetchSearch();
            }}
            label={"Search Results"}
            style={"basic"}
          />
        ) : (
          <StoreListContent />
        )}
      </div>
    </>
  );
}

function MiniSearchbar({ closing }) {
  const { search, setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <div className={`mini-searchbar ${closing ? "out" : ""}`}>
      <TextInput
        placeholder={"Search vendors..."}
        img={searchIcon}
        customStyle={"bg-white border-2 border-(--primary-color) !text-black"}
        value={search.query}
        onChange={(v) => setSearch({ ...search, query: v })}
        onEnter={() => navigate("/app/stores/search")}
      />
    </div>
  );
}

function StoreListContent() {
  const { isMobile, setIsMobile } = useContext(MobileContext);

  return (
    <>
      <StoreItems
        fetch={async (stores, setStores) => {
          const response = await request("POST", "/store/find", {});
          if (!response || response.error)
            return setStores({ ...stores, error: true });
          setStores({ loading: false, data: response });
        }}
        label={"Other people recommend"}
        style={"basic"}
        collapse={{ limit: isMobile ? 3 : 6 }}
      />

      <StoreItems
        fetch={async (stores, setStores) => {
          const response = await request("POST", "/store/find", {});
          if (!response || response.error)
            return setStores({ ...stores, error: true });
          setStores({ loading: false, data: response });
        }}
        label={"All Stores"}
        style={"basic"}
        collapse={{ limit: 10 }}
      />
    </>
  );
}
