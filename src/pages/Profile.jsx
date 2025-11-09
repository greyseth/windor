import "../assets/css/profile.css";
import profileIcon from "../assets/icons/icon_profile.svg";
import addIcon from "../assets/icons/icon_add.svg";
import orderIcon from "../assets/icons/icon_order.svg";
import starIcon from "../assets/icons/icon_star.svg";
import packageIcon from "../assets/icons/icon_package_primary.svg";
import menuIcon from "../assets/icons/icon_menu_primary.svg";
import testImg from "../assets/img/img_testing.png";

import TextInput from "../components/TextInput";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "../providers/PopupProvider";
import { useNavigate } from "react-router-dom";
import request from "../util/API";
import LoadingError from "../components/LoadingError";
import LoadingSpinner from "../components/LoadingSpinner";
import { LoginContext } from "../providers/LoginProvider";
import getImage from "../util/getImage";

export default function Profile() {
  const { loginToken, setLoginToken } = useContext(LoginContext);
  const { popup, setPopup } = useContext(PopupContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ loading: true, data: {} });
  const [stores, setStores] = useState({ loading: true, data: [] });

  async function fetchCredentials() {
    const response = await request("GET", "/user/verify");
    if (!response || response.error)
      return setCredentials({ ...credentials, error: true });

    setCredentials({ ...credentials, loading: false, data: response });
  }

  async function fetchStores() {
    const response = await request("GET", "/seller");
    if (!response || response.error)
      return setStores({ ...stores, error: true });

    setStores({ loading: false, data: response });
  }

  useEffect(() => {
    fetchCredentials();
    fetchStores();
  }, []);

  return (
    <div className="profile-container">
      {/* Profile Details */}
      {credentials.loading ? (
        credentials.error ? (
          <LoadingError onRetry={fetchCredentials} />
        ) : (
          <LoadingSpinner />
        )
      ) : (
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
              value={credentials.data.username}
              onChange={(v) =>
                setCredentials({
                  ...credentials,
                  data: { ...credentials.data, username: v },
                })
              }
              onEnter={async () => {
                const response = await request("PATCH", "/user", {
                  username: credentials.data.username,
                });
                if (response && response.error)
                  return setPopup({
                    type: "error",
                    title: "An Error has Occurred",
                    message: "Failed to update username",
                  });

                setPopup({
                  type: "success",
                  title: "Updated Account Details",
                  message: "Successfully updated username",
                });
              }}
            />
          </div>
          <div>
            <TextInput
              placeholder={"Email"}
              customStyle={"text-xs bg-white"}
              readonly={true}
              value={credentials.data.email}
            />
          </div>
          <div>
            <button
              className="btn red smaller noshadow text-sm w-full"
              onClick={() =>
                setPopup({
                  type: "notice",
                  title: "Confirmation",
                  message:
                    "Are you sure you want to log out of your account? You're going to have to enter your credentials again",
                  cantIgnore: true,
                  buttons: [
                    {
                      label: "Yes",
                      onClick: () => {
                        window.localStorage.removeItem("login_token");
                        navigate("/auth");
                      },
                    },
                    {
                      label: "No",
                      onClick: () => {},
                    },
                  ],
                })
              }
            >
              LOG OUT
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        <button
          className="btn primary w-full"
          onClick={() => navigate("/app/transactions")}
        >
          <img src={orderIcon} />
          <p>Order History</p>
        </button>

        <div className="my-8"></div>

        {/* My Stores List */}
        {stores.loading ? (
          stores.error ? (
            <LoadingError onRetry={fetchStores} />
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <div>
            <h1 className="w-full bg-(--primary-color) py-2 text-white text-center font-bold rounded-tl-md rounded-tr-md">
              My Stores
            </h1>
            <div className="store-container bg-gray-300 p-4 rounded-bl-md rounded-br-md">
              {stores.data.length > 0 ? (
                <p className="text-sm text-black/60">Scroll to see all</p>
              ) : null}
              <ul className="mystore-list">
                {stores.data.map((s) => (
                  <li
                    key={s.id_store}
                    className="relative bg-gray-500 border-8 rounded-md border-white"
                  >
                    {/* Store Overview */}
                    <div className="w-full p-4 z-10 bg-white rounded-bl-lg rounded-br-lg">
                      <p className="font-bold">{s.name}</p>
                      <p className="flex gap-2 items-center">
                        <div
                          className={`size-4 ${
                            s.active ? "bg-green-500" : "bg-red-500"
                          } rounded-full`}
                        ></div>
                        {s.active ? "Active" : "Inactive"}
                      </p>

                      <div className="my-4 h-0.5 bg-gray-500 w-full"></div>

                      <div className="grid grid-cols-[1fr_1fr_1fr]">
                        <div>
                          <div className="flex justify-center items-center gap-1.5 font-bold">
                            <img src={starIcon} />
                            <p>{s.rating}</p>
                          </div>
                          <p className="text-center">Rating</p>
                        </div>
                        <div>
                          <div className="flex justify-center items-center gap-1.5 font-bold">
                            <img src={packageIcon} />
                            <p>{s.category_name}</p>
                          </div>
                          <p className="text-center">Category</p>
                        </div>
                        <div>
                          <div className="flex justify-center items-center gap-1.5 font-bold">
                            <img src={menuIcon} />
                            <p>{s.items_count}</p>
                          </div>
                          <p className="text-center">Items</p>
                        </div>
                      </div>
                    </div>

                    {/* Store thumbnail */}
                    <div className="grow p-2">
                      <img
                        src={getImage(s.thumbnail)}
                        className="w-full h-auto aspect-video object-cover"
                      />
                    </div>
                  </li>
                ))}
                <li className="new">
                  <img src={addIcon} />
                  <p>Start New Store</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
