import { useEffect, useRef, useState } from "react";
import dropdownIcon from "../assets/icons/icon_dropdown_black.svg";
import receiptIcon from "../assets/icons/icon_order.svg";
import testImg from "../assets/img/img_testing.png";
import { useNavigate } from "react-router-dom";

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
        <li
          className="p-2 rounded-lg bg-white shadow-lg"
          onClick={() => navigate("/app/transactions/1")}
        >
          <div className="flex justify-between items-center">
            <p className="font-bold">RM PADANG</p>
            <p className="text-sm text-gray-500/80">00/00/0000 00:00</p>
          </div>
          <div className="grid grid-cols-[30%_1fr] gap-2 mt-2">
            <img
              src={testImg}
              className="w-full h-auto aspect-square object-cover rounded-lg"
            />
            <div>
              <p className="font-bold">Rp. 500,000</p>
              <p className="text-gray-500/80 text-sm">5 Items</p>
              <p>Paid in Cash</p>
            </div>
            <p className="text-center my-auto font-bold">PENDING</p>
            <div className="flex justify-end items-stretch gap-2">
              <img src={receiptIcon} className="btn primary smaller" />
              <button
                className="btn primary smaller"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Mark as Done
              </button>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
