import { useContext, useEffect, useRef, useState } from "react";
import backIcon from "../assets/icons/icon_back.svg";
import searchIcon from "../assets/icons/icon_search.svg";

import TextInput from "../components/TextInput";
import { SearchContext } from "../providers/SearchProvider";
import { useNavigate } from "react-router-dom";
import StoreItems from "../components/StoreItems";
import request from "../util/API";
import { PopupContext } from "../providers/PopupProvider";

export default function StoreSearch() {
  const { search, setSearch } = useContext(SearchContext);
  const { popup, setPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

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

  const storesListRef = useRef({});
  const fetchSearch = async () => {
    const { stores, setStores } = storesListRef.current;

    const response = await request("POST", "/store/find", search);
    if (!response || response.error)
      return setStores({ ...stores, error: true });
    setStores({ loading: false, data: response });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSearch();
  }, [search.min_rating, search.max_price, search.id_category]);

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
          onEnter={fetchSearch}
          value={search.query}
        />
        <div className="flex justify-between items-center mt-4">
          <select
            className="dropdown text-center"
            value={search.id_category}
            onChange={(e) =>
              setSearch({ ...search, id_category: e.target.value })
            }
          >
            {categories.length < 1 ? (
              <option>Loading Categories...</option>
            ) : (
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
            )}
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

      <StoreItems
        fetch={(stores, setStores) => {
          storesListRef.current = { stores, setStores };
          fetchSearch();
        }}
        label={"Search Results"}
        style={"basic"}
      />
    </>
  );
}
