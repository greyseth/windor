import walletIcon from "../assets/icons/icon_wallet_primary.svg";
import topupIcon from "../assets/icons/icon_topup_primary.svg";
import topupIconWhite from "../assets/icons/icon_topup_white.svg";
import transferIcon from "../assets/icons/icon_transfer_primary.svg";
import transferIconWhite from "../assets/icons/icon_transfer_white.svg";
import searchIcon from "../assets/icons/icon_search.svg";
import starIcon from "../assets/icons/icon_star_white.svg";

import bannerImage from "../assets/img/landing_banner.jpeg";
import testImg from "../assets/img/img_testing.png";
import TextInput from "../components/TextInput";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ExtraPageContainer from "../components/ExtraPageContainer";
import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Topup from "../components/popscreen/Popscreen_Topup";
import Popscreen_Transfer from "../components/popscreen/Popscreen_Transfer";
import { SearchContext } from "../providers/SearchProvider";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";
import request from "../util/API";
import Popscreen_Coupon from "../components/popscreen/Popscreen_Coupon";
import getImage from "../util/getImage";
import { MobileContext } from "../providers/MobileProvider";
import SearchFilters from "../components/SearchFilters";
import targetIcon from "../assets/icons/icon_target_primary.svg";

export default function Home() {
  const { search, setSearch } = useContext(SearchContext);
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const { isMobile, setIsMobile } = useContext(MobileContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.pathname.includes("/wincoins") ? (
        <ExtraPageContainer>
          <Outlet />
        </ExtraPageContainer>
      ) : null}

      {/* Floating Search Bar */}
      {isMobile ? (
        <div className="w-full p-4 fixed top-0 left-0">
          <TextInput
            placeholder={"What to eat?"}
            img={searchIcon}
            customStyle={
              "bg-white border-2 border-(--primary-color) !text-black"
            }
            value={search.query}
            onChange={(v) => setSearch({ ...search, query: v })}
            onEnter={() => navigate("/app/stores/search")}
          />
        </div>
      ) : null}

      {isMobile ? (
        <>
          <img
            src={bannerImage}
            className="w-full h-auto aspect-video object-cover"
          />

          <div className="w-full p-4">
            {/* Wincoin Shortcuts */}
            <div className="w-full p-2 rounded-lg shadow-lg grid grid-cols-[1fr_2px_1fr] text-(--primary-color)">
              <div
                className="flex items-center justify-evenly"
                onClick={() => navigate("/app/wincoins")}
              >
                <div className="flex flex-col justify-between items-center gap-1">
                  <img src={walletIcon} />
                  <p className="text-xs">Wincoins</p>
                </div>
                <p className="font-bold">100,000</p>
                <div></div>
              </div>
              <div className="h-full bg-gray-500"></div>
              <div className="flex items-center justify-evenly">
                <div
                  className="flex flex-col justify-between items-center gap-1"
                  onClick={() => setPopscreen({ element: <Popscreen_Topup /> })}
                >
                  <img src={topupIcon} />
                  <p className="text-xs">Top-Up</p>
                </div>
                <div
                  className="flex flex-col justify-between items-center gap-1"
                  onClick={() =>
                    setPopscreen({ element: <Popscreen_Transfer /> })
                  }
                >
                  <img src={transferIcon} />
                  <p className="text-xs">Transfer</p>
                </div>
              </div>
            </div>

            <div className="my-8"></div>

            <HomeContent />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-2">
          <div className="w-full p-4">
            <img
              src={bannerImage}
              className="w-[80%] h-[200px] mx-auto object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="w-full grid grid-cols-[25%_1fr_25%] flex-1 min-h-0 [&>div]:p-4 overflow-hidden">
            <div>
              {/* Search Filters */}
              <SearchFilters />
            </div>

            <div className="flex flex-col min-h-0 overflow-hidden">
              <div className="overflow-y-auto">
                {/* Home content */}
                {/* Store List */}

                <div className="w-full h-full overflow-y-auto resp-home-content">
                  <HomeContent />
                </div>
              </div>
            </div>
            <div>
              {/* Wincoins Display (completely different on desktop cuz why not) */}
              <div className="bg-white p-4 rounded-xl shadow-xl w-full h-full overflow-y-auto space-y-4">
                <div className="p-4 shadow-xl rounded-lg">
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

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="btn primary full"
                    onClick={() =>
                      setPopscreen({ element: <Popscreen_Topup /> })
                    }
                  >
                    <img src={topupIconWhite} />
                    <p>Top Up</p>
                  </button>

                  <button
                    className="btn primary full"
                    onClick={() =>
                      setPopscreen({ element: <Popscreen_Transfer /> })
                    }
                  >
                    <img src={transferIconWhite} />
                    <p>Transfer</p>
                  </button>
                </div>

                <button className="btn primary full">Explore Rewards</button>
                {/* TODO: Turn rewards into a popscreen */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HomeContent() {
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
      {/* Today's Recommendation */}
      {/* TODO: Make API endpoint and implement on frontend */}
      <h1 className="font-bold text-xl">Today's Recommendation</h1>
      <p className="text-xs text-gray-500/80">
        Don't know what to eat? We got you. Consider what we recommend for
        today's meal
      </p>
      <div className="w-full max-w-[500px] mx-auto mt-4 p-4 bg-(--primary-color) rounded-xl grid grid-cols-[40%_1fr] gap-2">
        <img
          className="aspect-square w-full h-auto object-cover rounded-md"
          src={testImg}
        />
        <div className="text-white flex flex-col">
          <p className="font-bold text-md">MENU NAME</p>
          <p className="text-sm">Rp. 17,000</p>
          <div className="w-full flex gap-0.5">
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
          </div>
          <div className="basis-0 grow"></div>
          <button className="btn smaller secondary w-full">Order</button>
        </div>
      </div>

      <div className="my-8"></div>

      {/* Promoted Coupons */}
      <h1 className="font-bold text-xl">Explore Promotions</h1>
      <p className="text-xs text-gray-500/80">
        Perfrom transactions using Wincoins and discover our exclusive
        promotions
      </p>
      {coupons.loading ? (
        coupons.error ? (
          <LoadingError onRetry={fetchCoupons} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <ul className="mt-2 w-full max-w-[500px] mx-auto overflow-x-scroll snap-x snap-mandatory list-none flex">
            {coupons.data
              .filter((_, i) => i < 4)
              .map((c) => (
                <li
                  key={c.id_coupon}
                  className="min-w-full p-4 snap-start"
                  onClick={() =>
                    setPopscreen({
                      element: <Popscreen_Coupon />,
                      id_coupon: c.id_coupon,
                    })
                  }
                >
                  <img
                    src={getImage(c.filename)}
                    className="w-full h-auto aspect-video object-cover rounded-lg"
                  />
                </li>
              ))}
            <li
              className="min-w-full p-4 snap-start"
              onClick={() => navigate("/app/wincoins")}
            >
              <div className="w-full h-auto aspect-video bg-(--primary-color) flex justify-center items-center rounded-lg">
                <p className="text-white font-bold">View All</p>
              </div>
            </li>
          </ul>
          <p className="text-xs text-gray-500/80 text-center">
            Scroll horizontally to view more
          </p>
        </>
      )}
    </>
  );
}
