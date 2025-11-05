import { useContext } from "react";
import backIcon from "../assets/icons/icon_back.svg";
import searchIcon from "../assets/icons/icon_search.svg";

import TextInput from "../components/TextInput";
import { SearchContext } from "../providers/SearchProvider";
import { useNavigate } from "react-router-dom";
import StoreItems from "../components/StoreItems";

export default function StoreSearch() {
  const { search, setSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img src={backIcon} onClick={() => navigate("/app/stores")} />
        <h2 className="text-(--primary-color) font-bold">Search Store</h2>
        <div></div>
      </div>

      <div className="p-4 w-full">
        <TextInput
          img={searchIcon}
          placeholder={"Search vendors..."}
          customStyle={"!text-black"}
          onChange={(v) => setSearch({ ...search, query: v })}
          value={search.query}
        />
        <div className="flex justify-between items-center mt-4">
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

      <StoreItems fetch={() => {}} label={"Search Results"} style={"basic"} />
    </>
  );
}
