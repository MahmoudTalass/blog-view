import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainPageLayout() {
   return (
      <>
         <Navbar />
         <Outlet />
      </>
   );
}

export default MainPageLayout;
