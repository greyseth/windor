import { useEffect, useRef, useState } from "react";
import "../assets/css/explore.css";

import searchIcon from "../assets/icons/icon_search.svg";
import testImage from "../assets/img/img_testing.png";
import StoreItems from "../components/StoreItems";

import TextInput from "../components/TextInput";

export default function Explore() {
  const exploreContainer = useRef(undefined);

  const [showMiniSearchbar, setShowMiniSearchbar] = useState(false);
  const showMiniSearchbarRef = useRef(showMiniSearchbar);
  const [closingMiniSearchbar, setClosingMiniSearchbar] = useState(false);

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

  useEffect(() => {
    console.log(closingMiniSearchbar);
    if (closingMiniSearchbar)
      setTimeout(() => {
        setShowMiniSearchbar(false);
        console.log("closing");
      }, 500);
    else clearTimeout(() => setShowMiniSearchbar(false));
  }, [closingMiniSearchbar]);

  return (
    <div
      className="w-full h-full overflow-y-auto overflow-visible"
      id="explore-container"
      ref={exploreContainer}
    >
      {showMiniSearchbar ? (
        <MiniSearchbar closing={closingMiniSearchbar} />
      ) : null}

      <div className="search-bar">
        <img src={testImage} />
        <div>
          <TextInput
            placeholder={"Search vendors"}
            img={searchIcon}
            customStyle={"bg-white border-2 border-(--primary-color)"}
          />
          <div className="filters">
            <select className="dropdown">
              <option>All Categories</option>
            </select>
            <select className="dropdown">
              <option>All Ratings</option>
            </select>
            <select className="dropdown">
              <option>All Prices</option>
            </select>
          </div>
        </div>
      </div>

      <StoreItems
        fetch={() => {}}
        label={"Based on your recent orders"}
        style={"long"}
      />

      <StoreItems
        fetch={() => {}}
        label={"Other people recommend"}
        style={"basic"}
        collapse={{ limit: 3 }}
      />

      <StoreItems fetch={() => {}} label={"All Stores"} style={"basic"} />
    </div>
  );
}

function MiniSearchbar({ closing }) {
  return (
    <div className={`mini-searchbar ${closing ? "out" : ""}`}>
      <TextInput
        placeholder={"Search vendors..."}
        img={searchIcon}
        customStyle={"bg-white border-2 border-(--primary-color)"}
      />
    </div>
  );
}
