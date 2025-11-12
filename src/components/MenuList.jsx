import { useParams } from "react-router-dom";
import thumbsIcon from "../assets/icons/icon_thumbs_primary.svg";
import LoadingError from "./LoadingError";
import { useEffect, useRef } from "react";

export default function MenuList({
  menuItems,
  cart,
  setCart,
  fetchMenu,
  idStore,
}) {
  const { id_store } = useParams();
  const id_storeRef = useRef(id_store ?? idStore);

  return (
    <ul>
      {menuItems.length < 1 ? (
        <LoadingError
          message={"Could not find menus"}
          btnMessage={"Refresh"}
          onRetry={fetchMenu}
        />
      ) : (
        menuItems.map((m) => (
          <li
            className="p-4 rounded-lg shadow-md w-full flex gap-4"
            key={m.id_menu}
          >
            <div className="basis-0 grow">
              <p>{m.name}</p>
              {m.description ? (
                <p className="text-sm text-gray-500/80">{m.description}</p>
              ) : null}
              <p className="text-sm text-gray-500/70">
                Rp. {Intl.NumberFormat("en-ID").format(m.price)}
              </p>
              <p className="text-sm text-(--primary-color)">{m.category}</p>
            </div>
            <div>
              {!cart.find((c) => c.id_menu === m.id_menu) ? (
                <button
                  className="btn primary rounded text-xs p-1"
                  onClick={() =>
                    setCart((prevCart) => [
                      ...prevCart,
                      { ...m, amount: 1, id_store: id_storeRef.current },
                    ])
                  }
                >
                  Order
                </button>
              ) : (
                <button
                  className="btn bg-(--tertiary-color) rounded text-xs p-1"
                  onClick={() =>
                    setCart((prevCart) =>
                      prevCart.filter((pc) => pc.id_menu !== m.id_menu)
                    )
                  }
                >
                  Remove
                </button>
              )}
              {m.best_seller ? (
                <img src={thumbsIcon} className="mx-auto" />
              ) : null}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
