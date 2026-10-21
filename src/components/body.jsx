import { Outlet } from "react-router-dom";
import { NavBar } from "./navbar";
import Footer from "./footer";

function Body() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
