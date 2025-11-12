import starIcon from "../../assets/icons/icon_star.svg";

import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Popscreen_ReviewWrite from "./Popscreen_ReviewWrite";
import request from "../../util/API";
import LoadingError from "../LoadingError";
import LoadingSpinner from "../LoadingSpinner";
import { PopupContext } from "../../providers/PopupProvider";

export default function Popscreen_Reviews() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const { popup, setPopup } = useContext(PopupContext);

  const [reviews, setReviews] = useState({ loading: true, data: [] });

  async function fetchReviews() {
    const response = await request(
      "GET",
      "/store/" + popscreen.id_store + "/review"
    );
    if (!response || response.error)
      return setReviews({ ...reviews, error: true });

    setReviews({ loading: false, data: response });
  }

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
      <h2 className="font-bold text-xl text-(--primary-color) text-center mb-4">
        All Reviews
      </h2>

      {reviews.loading ? (
        reviews.error ? (
          <LoadingError onRetry={fetchReviews} />
        ) : (
          <LoadingSpinner />
        )
      ) : reviews.data.length > 0 ? (
        <ul className="w-full max-h-82 overflow-y-auto rounded-lg space-y-3">
          {reviews.data.map((r) => (
            <li className="bg-gray-400/45 p-2 rounded-md gap-4">
              <div className="flex items-center gap-1 w-full">
                {[...Array(r.stars)].map((_, i) => (
                  <img key={i} src={starIcon} />
                ))}
              </div>
              <p className="text-md">"{r.content}"</p>
              <p className="text-gray-500/80 text-xs">{r.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-bold text-center text-(--primary-color)">
          No reviews yet. Be the first!
        </p>
      )}

      {!popscreen.has_reviewed ? (
        <button
          className="btn smaller primary full mt-4"
          onClick={() => {
            if (popscreen.has_ordered)
              setPopscreen({
                element: <Popscreen_ReviewWrite />,
                id_store: popscreen.id_store,
              });
            else
              setPopup({
                type: "notice",
                title: "Can't Create Review Yet",
                message:
                  "You must make an order at this store to be able to post a review",
              });
          }}
        >
          Add Your Review
        </button>
      ) : null}
    </div>
  );
}
