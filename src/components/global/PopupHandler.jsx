import "../../assets/css/popup.css";

import closeIcon from "../../assets/icons/icon_close.svg";

import { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../providers/PopupProvider";

export default function PopupHandler() {
  const { popup, setPopup } = useContext(PopupContext);

  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  const colors = [
    {
      type: "notice",
      style: "bg-blue-400/80 border-blue-400",
    },
    { type: "error", style: "bg-red-500/80 border-red-500" },
    { type: "success", style: "bg-green-500/80 border-green-500" },
  ];

  useEffect(() => {
    if (popup) {
      setClosing(false);
      setClosed(false);
    }
  }, [popup]);

  const animationTime = 500;
  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setPopup(undefined);
      setClosed(true);
    }, animationTime);
  }

  // Container for the popup messages
  return (
    <>
      {popup && !closed ? (
        <div
          className={`popup-container rounded-md border-2 p-2 ${
            colors.find((c) => c.type === popup.type).style
          } ${closing ? "out" : "in"}`}
        >
          <div
            className="w-full flex gap-4 mb-2 cursor-pointer"
            onClick={() => handleClose()}
          >
            <p className="text-white font-bold grow">{popup.title}</p>
            {/* Close button */}
            <img src={closeIcon} className="size-6" />
          </div>

          <p className="text-white w-full mb-2">{popup.message}</p>

          {popup.buttons ? (
            <div
              className={`w-full grid ${
                "grid-cols-[" + popup.buttons.map((_) => "1fr").join("_") + "]"
              } gap-x-2`}
            >
              {popup.buttons.map((b, i) => (
                <button
                  key={i}
                  className={`btn smaller noshadow ${b.color ?? "white"}`}
                  onClick={() => {
                    b.onClick();
                    if (!b.dontCloseOnClick) handleClose();
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
