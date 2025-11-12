import { useContext } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import Receipt from "../../pages/Receipt";

export default function Popscreen_Receipt() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  return (
    <div className="w-full h-full overflow-y-auto max-w-[500px] bg-white p-4 rounded-xl">
      <Receipt idOrder={popscreen.id_order} />
    </div>
  );
}
