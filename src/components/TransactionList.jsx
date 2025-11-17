import { useContext, useEffect, useRef, useState } from "react";
import dropdownIcon from "../assets/icons/icon_dropdown_black.svg";
import receiptIcon from "../assets/icons/icon_order.svg";
import { useNavigate } from "react-router-dom";
import formatDate from "../util/formatDate";
import getImage from "../util/getImage";
import { MobileContext } from "../providers/MobileProvider";
import { PopscreenContext } from "../providers/PopscreenProvider";
import Popscreen_Receipt from "./popscreen/Popscreen_Receipt";
import request from "../util/API";
import { PopupContext } from "../providers/PopupProvider";

export default function TransactionList({
  label,
  transactions,
  setTransactions,
}) {
  const { isMobile, setIsMobile } = useContext(MobileContext);
  const { popup, setPopup } = useContext(PopupContext);
  const { popscreen, setPopscreen } = useContext(PopscreenContext);
  const navigate = useNavigate();
  const list = useRef(undefined);

  const [collapsed, setCollapsed] = useState(false);
  const [itemsHeight, setItemsHeight] = useState(0);

  useEffect(() => {
    const el = list.current;
    if (!el) return;

    setItemsHeight(el.clientHeight);
  }, []);

  return (
    <>
      <div
        className="w-full p-4 flex justify-between items-center cursor-pointer select-none active:bg-gray-500/30 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <p className="font-bold">{label}</p>
        <img
          src={dropdownIcon}
          className={`${
            collapsed ? "rotate-0" : "rotate-180"
          } transition-transform`}
        />
      </div>
      <ul
        ref={list}
        className={`p-4 pt-0 space-y-4 overflow-y-clip ${
          !collapsed
            ? itemsHeight
              ? `h-[${itemsHeight}px]`
              : "object-fit"
            : "h-0 py-0"
        } transition-all duration-200`}
      >
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li
              key={t.id_order}
              className="p-2 rounded-lg bg-white shadow-lg resp-transactionlist"
              onClick={() => {
                if (isMobile) navigate("/app/transactions/" + t.id_order);
                else
                  setPopscreen({
                    element: <Popscreen_Receipt />,
                    id_order: t.id_order,
                  });
              }}
            >
              <div className="flex justify-between items-center gap-2">
                <p className="font-bold text-sm">{t.store.name}</p>
                <p className="text-xs text-gray-500/80">
                  {formatDate(t.order_date)} {t.order_schedule}
                </p>
              </div>
              <div className="grid grid-cols-[30%_1fr] gap-2 mt-2">
                <img
                  src={getImage(t.store.thumbnail)}
                  className="w-full mx-auto max-w-32 h-auto aspect-square object-cover rounded-lg"
                />
                <div>
                  <p className="font-bold">
                    Rp. {Intl.NumberFormat("en-ID").format(t.order_price)}
                  </p>
                  <p className="text-gray-500/80 text-sm">
                    {t.order_amount} Items
                  </p>
                  <p>Paid in {t.order_payment}</p>
                  {t.order_cancel_reason ? (
                    <p>Cancelled Because: {t.order_cancel_reason}</p>
                  ) : null}
                </div>
                <p
                  className={`text-center my-auto font-bold ${
                    t.order_status === "DONE"
                      ? "text-green-400"
                      : t.order_status === "ACCEPT"
                      ? "text-blue-400"
                      : t.order_status === "CANCEL"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {t.order_status}
                </p>
                <div className="flex justify-end items-stretch gap-2">
                  <img src={receiptIcon} className="btn primary smaller" />
                  {t.order_status === "ACCEPT" ? (
                    <button
                      className="btn primary smaller"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const response = await request(
                          "PATCH",
                          "/order/" + t.id_order + "/done"
                        );
                        if (response && response.error)
                          return setPopup({
                            type: "error",
                            title: "Failed to change order status",
                            message: "An error has occurred",
                          });

                        setTransactions((prev) =>
                          prev.map((pt) =>
                            pt.id_order !== t.id_order
                              ? pt
                              : { ...pt, order_status: "DONE" }
                          )
                        );
                        setPopup({
                          type: "success",
                          title: "Successfully changed order status",
                          message: "Order has been marked as done and complete",
                        });
                      }}
                    >
                      Mark as Done
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="font-bold text-sm text-center text-gray-500/80">
            No Transactions to Show
          </p>
        )}
      </ul>
    </>
  );
}
