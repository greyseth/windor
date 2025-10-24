import { Outlet } from "react-router-dom";
import Navbar from "./components/global/Navbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-stretch">
      <div className="grow ">
        <p>This is the main container for the application</p>
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default App;
