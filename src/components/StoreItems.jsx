import starIcon from "../assets/icons/icon_star.svg";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LoadingError from "./LoadingError";
import { useNavigate } from "react-router-dom";

export default function StoreItems({ fetch, label, style, collapse }) {
  // fetch -> store fetch function
  // style -> 'basic', 'long', 'square'

  const navigate = useNavigate();

  const [stores, setStores] = useState({
    loading: false,
    data: [
      {
        id_store: 1,
        name: "RM Padang",
        rating: 4,
        price_min: 5000,
        price_max: 17000,
        thumbnail:
          "https://preview.redd.it/tried-to-see-the-simetry-of-the-famous-stock-image-man-v0-i3k94xhqv0ja1.jpg?width=933&format=pjpg&auto=webp&s=677cc06120e617a2f42dff20d04e5769a566a510",
      },
      {
        id_store: 2,
        name: "RM Padang",
        rating: 4,
        price_min: 5000,
        price_max: 17000,
        thumbnail:
          "https://preview.redd.it/tried-to-see-the-simetry-of-the-famous-stock-image-man-v0-i3k94xhqv0ja1.jpg?width=933&format=pjpg&auto=webp&s=677cc06120e617a2f42dff20d04e5769a566a510",
      },
      {
        id_store: 3,
        name: "RM Padang",
        rating: 4,
        price_min: 5000,
        price_max: 17000,
        thumbnail:
          "https://preview.redd.it/tried-to-see-the-simetry-of-the-famous-stock-image-man-v0-i3k94xhqv0ja1.jpg?width=933&format=pjpg&auto=webp&s=677cc06120e617a2f42dff20d04e5769a566a510",
      },
      {
        id_store: 4,
        name: "RM Padang",
        rating: 4,
        price_min: 5000,
        price_max: 17000,
        thumbnail:
          "https://preview.redd.it/tried-to-see-the-simetry-of-the-famous-stock-image-man-v0-i3k94xhqv0ja1.jpg?width=933&format=pjpg&auto=webp&s=677cc06120e617a2f42dff20d04e5769a566a510",
      },
    ],
  });

  return (
    <>
      <p className="ml-4">{label}</p>
      {stores.loading ? (
        stores.error ? (
          <LoadingError />
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <ul
          className={`mb-8 ${
            style === "long"
              ? "flex items-stretch overflow-x-auto p-4 gap-4"
              : "space-y-4 space-x-4 p-4"
          }`}
        >
          {stores.data.length > 0 ? (
            <>
              {stores.data
                .filter((_, i) => (!collapse ? true : i + 1 <= collapse.limit))
                .map((s) =>
                  style === "basic" ? (
                    <Basic
                      s={s}
                      onClick={(s) => navigate(`/app/stores/${s.id_store}`)}
                    />
                  ) : (
                    <Long
                      s={s}
                      onClick={(s) => navigate(`/app/stores/${s.id_store}`)}
                    />
                  )
                )}
              {collapse ? (
                <button className="btn primary full">Show More</button>
              ) : null}
            </>
          ) : (
            <p>We couldn't find any vendors</p>
          )}
        </ul>
      )}
    </>
  );
}

function Basic({ s, onClick }) {
  return (
    <li
      key={s.id_store}
      onClick={() => onClick(s)}
      className="p-4 rounded-lg shadow-md w-full grid grid-cols-[86px_1fr] gap-4 storeitem"
    >
      <img src={s.thumbnail} className="rounded-md object-cover" />
      <div>
        <p>{s.name}</p>
        <div className="flex items-center gap-1 my-1">
          <img src={starIcon} />
          <p>{s.rating}</p>
        </div>
        <p className="text-sm text-blue-500/60">
          Rp. {Intl.NumberFormat("en-ID").format(s.price_min)} -- Rp.{" "}
          {Intl.NumberFormat("en-ID").format(s.price_max)}
        </p>
      </div>
    </li>
  );
}

function Long({ s, onClick }) {
  return (
    <li
      key={s.id_store}
      onClick={() => onClick(s)}
      className="rounded-lg shadow-md w-full grid grid-cols-[40%_1fr] gap-4 storeitem overflow-clip"
    >
      <div className="flex justify-center items-center flex-col p-4 text-center">
        <p>{s.name}</p>
        <div className="flex items-center gap-1 my-1">
          <img src={starIcon} />
          <p>{s.rating}</p>
        </div>
      </div>
      <div className="w-full h-auto aspect-video rounded-md object-cover relative overflow-clip">
        <div className="transparency"></div>
        <img src={s.thumbnail} className="absolute" />
      </div>
    </li>
  );
}

function Square({ s, onClick }) {
  return <li key={s.id_store} onClick={onClick}></li>;
}
