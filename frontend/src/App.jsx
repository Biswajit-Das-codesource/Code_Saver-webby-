import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import SplashCursor from "./blocks/Animations/SplashCursor/SplashCursor";
function App() {
  return (
    <>
      {/* <SplashCursor /> */}
        <div className=" overflow-hidden">
           
        <Navbar />

        <Outlet />
        </div>
    </>
  );
}

export default App;
