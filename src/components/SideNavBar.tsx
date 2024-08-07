import { NavLink } from "react-router-dom";
import { GoLightBulb } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPeople } from "react-icons/go";

function SideNavBar() {
  const sideNavItems = [
    {
      iconImage: <GoLightBulb className="text-xl" />,
      linkName: "Notes",
      linkUrl: "/notes",
    },
    {
      iconImage: <FaRegTrashAlt className="text-xl" />,
      linkName: "Trash",
      linkUrl: "/trash",
    },
    {
      iconImage: <GoPeople className="text-xl" />,
      linkName: "Colloborative",
      linkUrl: "/colloborative",
    },
  ];
  return (
    <div className="h-full w-72 col-start-1 col-end-2 row-start-2 row-end-3">
      <ul className="flex flex-col">
        {sideNavItems.map((sideNavItem, index) => (
          <NavLink
            to={sideNavItem.linkUrl}
            key={index}
            className={({ isActive }) =>
              `flex h-12 pl-5 rounded-e-full ${
                isActive ? "bg-[#FEEFBE]" : "hover:bg-[#e7e9ea]"
              }  items-center gap-x-7`
            }
          >
            {sideNavItem.iconImage}

            {sideNavItem.linkName}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default SideNavBar;
