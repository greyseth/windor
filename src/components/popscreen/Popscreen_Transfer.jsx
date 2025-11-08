import searchIcon from "../../assets/icons/icon_search.svg";
import personIcon from "../../assets/icons/icon_profile_primary.svg";
import checkIcon from "../../assets/icons/icon_check_primary.svg";

import { useContext, useEffect, useState } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";
import TextInput from "../TextInput";
import LoadingError from "../LoadingError";
import Popscreen_TransferFunds from "./Popscreen_TransferFunds";
import request from "../../util/API";

export default function Popscreen_Transfer() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState(undefined);

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await request("GET", "/user/" + searchInput);
    if (!response || response.error) return setUsers([]);

    setUsers(response);
  }

  useEffect(() => {
    if (popscreen.recipient) {
      setSelected(popscreen.recipient);
      setSearchInput(popscreen.recipient.username);
    }
  }, []);

  useEffect(() => {
    if (searchInput) fetchUsers();
  }, [searchInput]);

  return (
    <div
      className="w-full p-4 rounded-xl bg-white"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2 className="font-bold text-xl text-(--primary-color) text-center">
        Transfer Wincoin Funds
      </h2>
      <p className="text-sm text-gray-500/80 text-center">Select recipient</p>

      <div className="my-4"></div>

      <TextInput
        img={searchIcon}
        placeholder={"Search by username or email"}
        customStyle={"text-black"}
        value={searchInput}
        onChange={(v) => setSearchInput(v)}
      />

      {selected ? (
        <li
          className="bg-white p-2 rounded-md flex items-center gap-4 mt-4"
          onClick={() => setSelected(undefined)}
        >
          <img src={checkIcon} />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold">{selected.username}</p>
            <p className="text-gray-500/80 text-xs">{selected.email}</p>
          </div>
        </li>
      ) : null}

      <ul className="mt-4 w-full max-h-82 overflow-y-auto rounded-lg p-4 space-y-4 bg-gray-400/45">
        {searchInput ? (
          users.length > 0 ? (
            users.map((u) => (
              <li
                className="bg-white p-2 rounded-md flex items-center gap-4"
                key={u.id_user}
                onClick={() => setSelected(u)}
              >
                <img src={personIcon} />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold">{u.username}</p>
                  <p className="text-gray-500/80 text-xs">{u.email}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-black">No users found</p>
          )
        ) : (
          <p className="text-black">Search recipient name or email address</p>
        )}
      </ul>

      {selected ? (
        <button
          className="btn primary full smaller mt-4"
          onClick={() =>
            setPopscreen({
              element: <Popscreen_TransferFunds />,
              recipient: selected,
            })
          }
        >
          Send Funds
        </button>
      ) : null}
    </div>
  );
}
