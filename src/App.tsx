import { NavBar, SideNavBar } from "./components";
import { Outlet } from "react-router-dom";
import { Note, SignIn } from "./pages/index.ts";
import useLocalStorage from "./customHooks/getLocalStorageData.ts";

export function ProtectedRoutes() {
  const authKey = useLocalStorage("authData");

  return (
    <>
      {authKey ? (
        <div className="grid grid-rows-[4rem_minmax(0px,_1fr)] grid-cols-[18rem_minmax(0,_1fr)] h-screen">
          <NavBar />
          <Outlet />
          <SideNavBar />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      )}
    </>
  );
}

export function UnprotectedRoutes() {
  const authKey = useLocalStorage("authData");

  return (
    <>
      {authKey ? (
        <div className="grid grid-rows-[4rem_minmax(0px,_1fr)] grid-cols-[18rem_minmax(0,_1fr)] h-screen">
          <NavBar />
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
