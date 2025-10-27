import { Outlet } from "react-router-dom";
import Navbar from "./components/global/Navbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-stretch">
      <div className="grow pb-8 overflow-y-scroll">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default App;
