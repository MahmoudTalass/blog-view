import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainPageLayout() {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
}

export default MainPageLayout;
