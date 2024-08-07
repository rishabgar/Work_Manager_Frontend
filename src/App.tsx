import { NavBar, SideNavBar } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Note, SignIn } from "./pages/index.ts";

export function ProtectedRoutes() {
  const auth = useSelector((state) => state?.authValidator.auth);

  return (
    <>
      {auth ? (
        <div className="grid grid-rows-[4rem_minmax(0px,_1fr)] grid-cols-[18rem_minmax(0,_1fr)] h-screen">
          <NavBar />
          <Outlet />
          <SideNavBar />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          {/* {(window.location.href = "/signin")} */}
          <SignIn />
        </div>
      )}
    </>
  );
}

export function UnprotectedRoutes() {
  const auth = useSelector((state) => state?.authValidator.auth);

  return (
    <>
      {auth ? (
        <div className="grid grid-rows-[4rem_minmax(0px,_1fr)] grid-cols-[18rem_minmax(0,_1fr)] h-screen">
          <NavBar />
          {/* {(window.location.href = "/notes")} */}
          <Note />
          <SideNavBar />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Outlet />
        </div>
      )}
    </>
  );
}
