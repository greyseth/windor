import { createContext, useState } from "react";

export const PopupContext = createContext();

function PopupProvider({ children }) {
  const [popup, setPopup] = useState(undefined);
  //   {
  //     type: "notice//error//success",
  //     title: "",
  //     message: "",
  //     cantIgnore: true//false,
  //     buttons: [
  //         {
  //         label: "",
  //         color: "white//red//green//primary//secondary",
  //         onClick: () => {},
  //         dontCloseOnClick: true//false,
  //         },
  //     ],
  //   }

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export default PopupProvider;
