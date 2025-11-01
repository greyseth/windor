import "../../assets/css/navbar.css";
import homeIcon from "../../assets/icons/icon_home.svg";
import homeIcon_selected from "../../assets/icons/icon_home_primary.svg";
import personIcon from "../../assets/icons/icon_profile_tertiary.svg";
import personIcon_selected from "../../assets/icons/icon_profile_primary.svg";
import exploreIcon from "../../assets/icons/icon_compass.svg";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
  );
}
