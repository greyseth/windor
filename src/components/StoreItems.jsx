import starIcon from "../assets/icons/icon_star.svg";

import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LoadingError from "./LoadingError";
import { useNavigate } from "react-router-dom";
import getImage from "../util/getImage";

export default function StoreItems({ fetch, label, style, collapse }) {
  // fetch -> store fetch function (defined in component placement, should return result)
  // style -> 'basic', 'long', 'square'

  const navigate = useNavigate();

  const [stores, setStores] = useState({
    loading: true,
    data: [],
  });
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(stores, setStores);
  }, []);

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
                .filter((_, i) =>
                  !collapse || showMore ? true : i + 1 < collapse.limit
                )
                .map((s) =>
                  style === "basic" ? (
                    <Basic
                      key={s.id_store}
                      s={s}
                      onClick={(s) => navigate(`/app/stores/${s.id_store}`)}
                    />
                  ) : (
                    <Long
                      key={s.id_store}
                      s={s}
                      onClick={(s) => navigate(`/app/stores/${s.id_store}`)}
                    />
                  )
                )}
              {collapse && !showMore ? (
                <button
                  className="btn primary full"
                  onClick={() => setShowMore(!showMore)}
                >
                  Show More
                </button>
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
      onClick={() => onClick(s)}
      className="p-4 rounded-lg shadow-md w-full grid grid-cols-[86px_1fr] gap-4 storeitem"
    >
      <img
        src={getImage(s.thumbnail)}
        className="rounded-md object-cover w-full h-auto aspect-square"
      />
      <div>
        <p>{s.name}</p>
        {s.rating ? (
          <div className="flex items-center gap-1 my-1">
            <img src={starIcon} />
            <p>{s.rating}</p>
          </div>
        ) : (
          <p className="text-sm text-(--secondary-color)">Not enough reviews</p>
        )}
        <p className="text-sm text-blue-500/60">
          Rp. {Intl.NumberFormat("en-ID").format(s.min_price)} -- Rp.{" "}
          {Intl.NumberFormat("en-ID").format(s.max_price)}
        </p>
      </div>
    </li>
  );
}

function Long({ s, onClick }) {
  return (
    <li
      onClick={() => onClick(s)}
      className="rounded-lg shadow-md min-w-full grid grid-cols-[40%_1fr] gap-4 storeitem overflow-clip"
    >
      <div className="flex justify-center items-center flex-col p-4 text-center">
        <p className="text-sm font-bold">{s.name}</p>
        <div className="flex items-center gap-1 my-1">
          <img src={starIcon} />
          <p>{s.rating}</p>
        </div>
      </div>
      <div className="w-full h-auto aspect-video rounded-md object-cover relative overflow-clip">
        <div className="transparency"></div>
        <img src={getImage(s.thumbnail)} className="absolute" />
      </div>
    </li>
  );
}

function Square({ s, onClick }) {
  return <li key={s.id_store} onClick={onClick}></li>;
}
