import "../../assets/css/navbar.css";
import homeIcon from "../../assets/icons/icon_home.svg";
import homeIcon_selected from "../../assets/icons/icon_home_primary.svg";
import personIcon from "../../assets/icons/icon_profile_tertiary.svg";
import personIcon_selected from "../../assets/icons/icon_profile_primary.svg";
import exploreIcon from "../../assets/icons/icon_compass.svg";
import searchIcon from "../../assets/icons/icon_search.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MobileContext } from "../../providers/MobileProvider";
import TextInput from "../TextInput";

const navItems = [
  {
    label: "Home",
    icon: { neutral: homeIcon, selected: homeIcon_selected },
    route: "/app",
  },
  {
    label: "Explore",
    icon: { neutral: exploreIcon, selected: exploreIcon },
    route: "/app/stores",
  },
  {
    label: "Profile",
    icon: { neutral: personIcon, selected: personIcon_selected },
    route: "/app/profile",
  },
];

export default function Navbar() {
  const { isMobile, setIsMobile } = useContext(MobileContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {isMobile ? (
        <div className="navbar text-sm text-(--tertiary-color)">
          <div className="top"></div>
          <div className="top shadow"></div>
          <div className="bottom">
            {navItems.map((n, i) => {
              const selected = location.pathname === n.route;
              return (
                <button
                  key={i}
                  className={selected ? "selected" : ""}
                  onClick={() => navigate(n.route)}
                >
                  <img src={selected ? n.icon.selected : n.icon.neutral} />
                  <p>{n.label}</p>
                </button>
              );
            })}
          </div>
          <div className="bottom shadow"></div>
        </div>
      ) : (
        <div className="w-full h-fit p-3 px-8 flex justify-between items-center bg-white shadow-xl fixed top-0 left-0 z-20">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <p className="text-lg text-(--primary-color) font-bold">WINDOR</p>
          </div>
          <div className="grow px-16">
            <TextInput img={searchIcon} placeholder={"What to eat?"} />
          </div>
          <div className="flex justify-center items-center gap-3">
            {navItems.map((n, i) => {
              const selected = location.pathname === n.route;
              return (
                <p
                  key={i}
                  className={`text-(--primary-color) cursor-pointer hover:text-(--secondary-color) transition-colors ${
                    selected ? "font-bold" : ""
                  }`}
                  onClick={() => navigate(n.route)}
                >
                  {n.label}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
