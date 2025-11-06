import { useEffect, useRef, useState } from "react";
import dropdownIcon from "../assets/icons/icon_dropdown_black.svg";
import receiptIcon from "../assets/icons/icon_order.svg";
import testImg from "../assets/img/img_testing.png";
import { useNavigate } from "react-router-dom";
import formatDate from "../util/formatDate";
import getImage from "../util/getImage";

export default function TransactionList({ label, transactions }) {
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
        className="w-full p-4 flex justify-between items-center active:bg-gray-500/30 transition-colors"
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
        className={`p-4 pt-0 overflow-y-clip ${
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
              className="p-2 rounded-lg bg-white shadow-lg"
              onClick={() => navigate("/app/transactions/" + t.id_order)}
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
                  className="w-full h-auto aspect-square object-cover rounded-lg"
                />
                <div>
                  <p className="font-bold">
                    Rp. {Intl.NumberFormat("en-ID").format(t.order_price)}
                  </p>
                  <p className="text-gray-500/80 text-sm">
                    {t.order_amount} Items
                  </p>
                  <p>Paid in {t.order_payment}</p>
                </div>
                <p
                  className={`text-center my-auto font-bold ${
                    t.order_status === "DONE"
                      ? "text-green-400"
                      : t.order_status === "ACCEPTED"
                      ? "text-blue-400"
                      : t.order_status === "CANCELLED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {t.order_status}
                </p>
                <div className="flex justify-end items-stretch gap-2">
                  <img src={receiptIcon} className="btn primary smaller" />
                  {t.order_status === "ACCEPTED" ? (
                    <button
                      className="btn primary smaller"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
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
