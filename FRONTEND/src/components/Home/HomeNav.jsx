import React, { useEffect } from "react";
import HomeNavSearch from "./HomeNavSearch";
import { NavLink, useLocation } from "react-router-dom";

function HomeNav() {
    const [activeNavItem, setActiveNavItem] = React.useState("All");
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const activeParam = params.get("blogType")?.toUpperCase();
        if (activeParam) {
          setActiveNavItem(activeParam);
        }
    },[location])

  const homeNavItems = [
    {
      name: "ALL",
      url: "?blogType=all",
    },
    {
      name: "TECHNOLOGY",
      url: "?blogType=technology",
    },
    {
      name: "LIFESTYLE",
      url: "?blogType=lifeStyle",
    },
    {
      name: "BUSINESS",
      url: "?blogType=business",
    },
    {
      name: "TRAVEL",
      url: "?blogType=travel",
    },
    {
      name: "FOOD",
      url: "?blogType=food",
    },
  ];
  return (
    <div className="w-full">
      <div className=" px-4 md:px-4 py-3 mx-auto flex flex-shrink-0 justify-between">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-2 rtl:space-x-reverse text-base">
            {homeNavItems.map((item) => (
              <li
                key={item.name}
                href="#"
                className={`text-gray-900 dark:text-white cursor-pointer py-1 px-5 rounded-lg ${activeNavItem===item.name ? 'bg-blue-800' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-all duration-300`}
              >
                <NavLink to={item.url}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-shrink-0 w-2/6 flex">
          <HomeNavSearch />
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
