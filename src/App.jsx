import { Outlet } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import { useContext } from "react";
import { MobileContext } from "./providers/MobileProvider";

function App() {
  const { isMobile, setIsMobile } = useContext(MobileContext);

  return (
    <div className="w-full h-screen flex flex-col items-stretch relative">
      {!isMobile ? <Navbar /> : null}
      <div className="grow pb-8 overflow-y-scroll">
        <Outlet />
      </div>
      {isMobile ? <Navbar /> : null}
    </div>
  );
}

export default App;
