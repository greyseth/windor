import starIcon from "../../assets/icons/icon_star.svg";
import starIconWhite from "../../assets/icons/icon_star_white.svg";

import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Popscreen_Reviews from "./Popscreen_Reviews";
import request from "../../util/API";
import { PopupContext } from "../../providers/PopupProvider";

export default function Popscreen_ReviewWrite() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const { popup, setPopup } = useContext(PopupContext);

  const [review, setReview] = useState({ content: "", stars: 5 });

  async function handleReview() {
    const response = await request(
      "POST",
      "/store/" + popscreen.id_store + "/review",
      review
    );
    if (response && response.error)
      return setPopup({
        type: "error",
        title: "An Error Has Occurred",
        message: "Failed to post review. Try again.",
      });

    setPopup({
      type: "success",
      title: "Successfully posted review",
    });
    setPopscreen({ ...popscreen, element: <Popscreen_Reviews /> });
  }

  return (
    <div
      className="w-full p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        Write a Review
      </h2>

      <div className="my-4"></div>

      <div className="flex items-center justify-center gap-3 w-full p-2 bg-gray-400/45 rounded-md">
        {[...Array(5)].map((_, i) => (
          <img
            src={i <= review.stars ? starIcon : starIconWhite}
            onClick={() => setReview({ ...review, stars: i + 1 })}
          />
        ))}
      </div>

      <div className="my-4"></div>

      <textarea
        className="w-full p-2 bg-gray-400/45 placeholder:text-gray-400 text-black min-h-32 outline-0 rounded-md"
        placeholder="Describe your experience"
        value={review.content}
        onChange={(e) => setReview({ ...review, content: e.target.value })}
      ></textarea>

      <button className="btn smaller primary full mt-4" onClick={handleReview}>
        Add Your Review
      </button>
      <button
        className="btn smaller red full mt-4"
        onClick={() =>
          setPopscreen({ ...popscreen, element: <Popscreen_Reviews /> })
        }
      >
        Cancel
      </button>
    </div>
  );
}
