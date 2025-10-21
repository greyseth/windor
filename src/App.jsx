import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <p>This is the main container for the application</p>
      <Outlet />
      <p>Navbar goes here</p>
    </>
  );
}

export default App;
