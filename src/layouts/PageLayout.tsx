import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PageLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PageLayout;