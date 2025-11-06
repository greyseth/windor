import starIcon from "../../assets/icons/icon_star.svg";

import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Popscreen_ReviewWrite from "./Popscreen_ReviewWrite";

export default function Popscreen_Reviews() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const [reviews, setReviews] = useState({ loading: true, data: [] });

  async function fetchReviews() {}

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div
      className="w-full p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        All Reviews
      </h2>

      <ul className="mt-4 w-full max-h-82 overflow-y-auto rounded-lg space-y-3">
        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
          <div className="flex items-center gap-1 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} />
            ))}
          </div>
          <p className="text-md">"Nice Nasi Padang"</p>
          <p className="text-gray-500/80 text-xs">username</p>
        </li>
        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
          <div className="flex items-center gap-1 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} />
            ))}
          </div>
          <p className="text-md">"Nice Nasi Padang"</p>
          <p className="text-gray-500/80 text-xs">username</p>
        </li>
        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
          <div className="flex items-center gap-1 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} />
            ))}
          </div>
          <p className="text-md">"Nice Nasi Padang"</p>
          <p className="text-gray-500/80 text-xs">username</p>
        </li>
        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
          <div className="flex items-center gap-1 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} />
            ))}
          </div>
          <p className="text-md">"Nice Nasi Padang"</p>
          <p className="text-gray-500/80 text-xs">username</p>
        </li>
        <li className="bg-gray-400/45 p-2 rounded-md gap-4">
          <div className="flex items-center gap-1 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={starIcon} />
            ))}
          </div>
          <p className="text-md">"Nice Nasi Padang"</p>
          <p className="text-gray-500/80 text-xs">username</p>
        </li>
      </ul>

      <button
        className="btn smaller primary full mt-4"
        onClick={() =>
          setPopscreen({
            element: <Popscreen_ReviewWrite />,
            id_store: popscreen.id_store,
          })
        }
      >
        Add Your Review
      </button>
    </div>
  );
}
