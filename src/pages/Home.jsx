import walletIcon from "../assets/icons/icon_wallet_primary.svg";
import topupIcon from "../assets/icons/icon_topup_primary.svg";
import transferIcon from "../assets/icons/icon_transfer_primary.svg";
import searchIcon from "../assets/icons/icon_search.svg";
import starIcon from "../assets/icons/icon_star_white.svg";

import bannerImage from "../assets/img/landing_banner.jpeg";
import testImg from "../assets/img/img_testing.png";
import TextInput from "../components/TextInput";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ExtraPageContainer from "../components/ExtraPageContainer";
import { useContext } from "react";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Topup from "../components/popscreen/Popscreen_Topup";
import Popscreen_Transfer from "../components/popscreen/Popscreen_Transfer";

export default function Home() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
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
      <div className="w-full p-4 fixed top-0 left-0">
        <TextInput
          placeholder={"What to eat?"}
          img={searchIcon}
          customStyle={"bg-white border-2 border-(--primary-color)"}
        />
      </div>

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
              onClick={() => setPopscreen({ element: <Popscreen_Transfer /> })}
            >
              <img src={transferIcon} />
              <p className="text-xs">Transfer</p>
            </div>
          </div>
        </div>

        <div className="my-8"></div>

        {/* Today's Recommendation */}
        <h1 className="font-bold text-xl">Today's Recommendation</h1>
        <p className="text-xs text-gray-500/80">
          Don't know what to eat? We got you. Consider what we recommend for
          today's meal
        </p>
        <div className="w-full mt-2 p-4 bg-(--primary-color) rounded-xl grid grid-cols-[40%_1fr] gap-2">
          <img
            className="aspect-square h-auto object-cover rounded-md"
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
        <ul className="mt-2 w-full overflow-x-scroll snap-x snap-mandatory list-none flex">
          <li className="min-w-full p-4 snap-start">
            <img
              src={testImg}
              className="w-full h-auto aspect-video object-cover rounded-lg"
            />
          </li>
          <li className="min-w-full p-4 snap-start">
            <img
              src={testImg}
              className="w-full h-auto aspect-video object-cover rounded-lg"
            />
          </li>
          <li className="min-w-full p-4 snap-start">
            <img
              src={testImg}
              className="w-full h-auto aspect-video object-cover rounded-lg"
            />
          </li>
        </ul>
        <p className="text-xs text-gray-500/80 text-center">
          Scroll horizontally to view more
        </p>
      </div>
    </>
  );
}
