import starIcon from "../assets/icons/icon_star.svg";

import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LoadingError from "./LoadingError";
import { useNavigate } from "react-router-dom";
import getImage from "../util/getImage";
import { MobileContext } from "../providers/MobileProvider";

export default function StoreItems({ fetch, label, style, collapse }) {
  // fetch -> store fetch function (defined in component placement, should return result)
  // style -> 'basic', 'long', 'square'

  const { isMobile, setIsMobile } = useContext(MobileContext);
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
        <>
          <ul
            className={`${isMobile ? "mb-8" : ""} ${
              style === "long"
                ? "flex items-stretch overflow-x-auto p-4 gap-4"
                : style === "square"
                ? "p-4 flex justify-start gap-4 overflow-x-auto mb-8"
                : `p-4 ${
                    !isMobile ? "grid grid-cols-3 gap-4" : "space-y-4 space-x-4"
                  }`
            }`}
          >
            {stores.data.length > 0 ? (
              <>
                {stores.data
                  .filter((_, i) =>
                    !collapse || showMore ? true : i + 1 <= collapse.limit
                  )
                  .map((s) =>
                    style === "basic" ? (
                      <Basic
                        key={s.id_store}
                        s={s}
                        onClick={(s) => navigate(`/app/stores/${s.id_store}`)}
                      />
                    ) : style === "square" ? (
                      <Square
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

                {isMobile && collapse && !showMore ? (
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

          {!isMobile && collapse && !showMore ? (
            <div className="w-full px-4 mb-8">
              <button
                className="btn primary full"
                onClick={() => setShowMore(!showMore)}
              >
                Show More
              </button>
            </div>
          ) : null}
        </>
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
      className={`rounded-lg shadow-md min-w-full grid grid-cols-[40%_1fr] gap-4 storeitem overflow-clip`}
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
  return (
    <li
      key={s.id_store}
      onClick={() => onClick(s)}
      className="size-64 rounded-xl shadow-xl relative overflow-clip cursor-pointer square-store shrink-0"
    >
      <img
        src={getImage(s.thumbnail)}
        className="size-full absolute left-0 top-0 object-cover -z-10"
      />
      <div className="size-full absolute left-0 top-0 bg-radial-[at_30%_10%] from-white/0 to-zinc-900 to-75% z-1 blacktrans"></div>
      <div className="size-full absolute left-0 top-0 p-4 flex flex-col justify-end z-2 details">
        <div className="w-full flex justify-end gap-2 items-center text-white">
          <img src={starIcon} />
          <p>{s.rating}</p>
        </div>
        <p className="text-white font-bold text-right">{s.name}</p>
      </div>
    </li>
  );
}
