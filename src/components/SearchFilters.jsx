import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../providers/SearchProvider";
import request from "../util/API";
import { PopupContext } from "../providers/PopupProvider";
import LoadingError from "./LoadingError";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function SearchFilters() {
  const { search, setSearch } = useContext(SearchContext);
  const { popup, setPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState({ loading: true, data: [] });
  const [initialLoad, setInitialLoad] = useState(true);

  async function fetchCategories() {
    const response = await request("GET", "/category");
    if (!response || response.error) {
      setSearch({ ...categories, error: true });
      return setPopup({
        type: "error",
        title: "An Error has Occurred",
        message: "Failed to load categories",
      });
    }

    setCategories({ loading: false, data: response });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (search.id_category || search.min_rating || search.max_price)
      navigate("/app/stores/search");
  }, [search.id_category, search.min_rating, search.max_price]);

  return (
    <div className="p-4 rounded-xl shadow-xl w-full h-full bg-white overflow-y-auto">
      {categories.loading ? (
        categories.error ? (
          <LoadingError onRetry={fetchCategories} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <>
          <p className="font-bold text-xl">Search Filters</p>

          <div className="h-4"></div>

          <p className="font-bold">Categories</p>
          <ul className="[&>li]:cursor-pointer text-gray-500/80 [&>li]:hover:text-(--secondary-color) [&>li]:transition-colors">
            {categories.data.map((c) => (
              <li
                key={c.id_category}
                onClick={() =>
                  setSearch({ ...search, id_category: c.id_category })
                }
              >
                {c.name}
              </li>
            ))}
          </ul>

          <div className="h-4"></div>

          <p className="font-bold">Minimum Rating</p>
          <ul className="[&>li]:cursor-pointer text-gray-500/80 [&>li]:hover:text-(--secondary-color) [&>li]:transition-colors">
            <li onClick={() => setSearch({ ...search, min_rating: 5 })}>
              ⭐ &gt; 5
            </li>
            <li onClick={() => setSearch({ ...search, min_rating: 4 })}>
              ⭐ &gt; 4
            </li>
            <li onClick={() => setSearch({ ...search, min_rating: 3 })}>
              ⭐ &gt; 3
            </li>
          </ul>

          <div className="h-4"></div>

          <p className="font-bold">Maximum Price Range</p>
          <ul className="[&>li]:cursor-pointer text-gray-500/80 [&>li]:hover:text-(--secondary-color) [&>li]:transition-colors">
            <li onClick={() => setSearch({ ...search, max_price: 30000 })}>
              price &lt; Rp. 30,000
            </li>
            <li onClick={() => setSearch({ ...search, max_price: 20000 })}>
              price &lt; Rp. 20,000
            </li>
            <li onClick={() => setSearch({ ...search, max_price: 15000 })}>
              price &lt; Rp. 15,000
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
