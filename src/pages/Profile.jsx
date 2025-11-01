import "../assets/css/profile.css";
import profileIcon from "../assets/icons/icon_profile.svg";
import addIcon from "../assets/icons/icon_add.svg";
import orderIcon from "../assets/icons/icon_order.svg";
import starIcon from "../assets/icons/icon_star.svg";
import testImg from "../assets/img/img_testing.png";

import TextInput from "../components/TextInput";

export default function Profile() {
  return (
    <div className="profile-container">
      {/* Profile Details */}
      <div className="profile-details">
        <div className="flex justify-center items-center">
          <img
            src={profileIcon}
            alt="Profile"
            className="bg-black p-8 rounded-full"
          />
        </div>
        <div>
          <TextInput
            placeholder={"Username"}
            customStyle={"text-xs bg-white"}
          />
        </div>
        <div>
          <TextInput placeholder={"Email"} customStyle={"text-xs bg-white"} />
        </div>
        <div>
          <button className="btn red smaller noshadow text-sm w-full">
            LOG OUT
          </button>
        </div>
      </div>

      <div className="p-4">
        <button className="btn primary w-full">
          <img src={orderIcon} />
          <p>Order History</p>
        </button>

        <div className="my-8"></div>

        {/* My Stores List */}
        <div>
          <h1 className="w-full bg-gray-500 py-2 text-(--secondary-color) text-center font-bold rounded-tl-md rounded-tr-md">
            My Stores
          </h1>
          <div className="store-container bg-gray-300 p-4 rounded-bl-md rounded-br-md">
            <p className="text-sm text-black/60">Scroll to see all</p>
            <ul className="mystore-list">
              <li className="relative bg-gray-500 border-8 rounded-md border-white">
                {/* Store Overview */}
                <div className="w-full p-4 z-10 bg-white rounded-bl-lg rounded-br-lg">
                  <p className="font-bold">Store Name Goes Here</p>
                  <p className="flex gap-2 items-center">
                    <div className="size-4 bg-green-500 rounded-full"></div>
                    Active
                  </p>

                  <div className="my-4 h-0.5 bg-gray-500 w-full"></div>

                  <div className="grid grid-cols-[1fr_1fr_1fr]">
                    <div>
                      <div className="flex justify-center items-center gap-1.5 font-bold">
                        <img src={starIcon} />
                        <p>5</p>
                      </div>
                      <p className="text-center">Rating</p>
                    </div>
                    <div>
                      <div className="flex justify-center items-center gap-1.5 font-bold">
                        <img src={starIcon} />
                        <p>5</p>
                      </div>
                      <p className="text-center">Rating</p>
                    </div>
                    <div>
                      <div className="flex justify-center items-center gap-1.5 font-bold">
                        <img src={starIcon} />
                        <p>5</p>
                      </div>
                      <p className="text-center">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Store thumbnail */}
                <div className="grow p-2">
                  <img src={testImg} className="size-full object-contain" />
                </div>
              </li>
              <li className="new">
                <img src={addIcon} />
                <p>Start New Store</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
