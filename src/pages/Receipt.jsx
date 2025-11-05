import { useNavigate, useParams } from "react-router-dom";

import backIcon from "../assets/icons/icon_back.svg";
import windorLogo from "../assets/img/img_windorlogo.png";

export default function Receipt() {
  const { id_order } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b-2 border-b-black shadow-lg p-2 sticky top-0 z-20">
        <img src={backIcon} onClick={() => navigate("/app/transactions")} />
        <h2 className="text-(--primary-color) font-bold">Viewing Receipt</h2>
        <div></div>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-center text-xs">
          <p className="font-bold text-lg">BENTO COFFEE</p>
          <p className="text-gray-500/80">
            Jl. Haji Juanda no. 69. Kec. Ciputat, Kota Tangerang Selatan Banten
            15414
          </p>
          <p className="text-gray-500/80 ">00/00/0000 at 00:00</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="border-b-2 border-t-2 border-gray-300/80 p-4 flex justify-between items-center">
          <p>Id Order</p>
          <p>001</p>
        </div>

        <div className="border-b-2 border-gray-300/80 p-4 grid grid-cols-3 gap-2 text-left">
          <p>Menu</p>
          <p className="text-center">Qty</p>
          <p className="text-right">Price</p>
          <p>Chicken Katsu</p>
          <p className="text-center">1x</p>
          <p className="text-right">Rp. 12,000</p>
          <p>Iced Sweet Tea</p>
          <p className="text-center">2x</p>
          <p className="text-right">Rp. 5,000</p>
        </div>

        <div className="p-4 space-y-4 border-b-2 border-gray-300/80">
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>Rp. 22,000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Discount</p>
            <p>30%</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Dorpoints</p>
            <p>+4</p>
          </div>
        </div>

        <div className="p-4 space-y-4 border-b-2 border-gray-300/80">
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>Rp. 17,000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Payment</p>
            <p>Wincoins</p>
          </div>
        </div>

        <div>
          <h1 className="w-full text-center font-bold text-xl">THANK YOU</h1>
          <p className="text-center">For purchasing with Windor</p>
          <img src={windorLogo} className="max-w-32 mx-auto" />
        </div>
      </div>
    </>
  );
}
