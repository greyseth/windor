import { createContext, useState } from "react";

export const PopscreenContext = createContext();

function PopscreenProvider({ children }) {
  const [popscreen, setPopscreen] = useState(undefined);
  // {element: <Component>, zIndex: 40}

  return (
    <PopscreenContext.Provider value={{ popscreen, setPopscreen }}>
      {children}
    </PopscreenContext.Provider>
  );
}

export default PopscreenProvider;
