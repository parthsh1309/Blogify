import React, { useEffect } from "react";
import HomeNavSearch from "./HomeNavSearch";
import { NavLink, useLocation } from "react-router-dom";

function HomeNav() {
  const [activeNavItem, setActiveNavItem] = React.useState("");
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activeParam = params.get("blog-category")?.toUpperCase();
    if (activeParam) {
      setActiveNavItem(activeParam);
      return;
    }
    setActiveNavItem("ALL");
  }, [location]);


  const homeNavItems = [
    {
      name: "ALL",
      url: "",
    },
    {
      name: "TECHNOLOGY",
      url: "?blog-category=Technology",
    },
    {
      name: "LIFESTYLE",
      url: "?blog-category=Lifestyle",
    },
    {
      name: "BUSINESS",
      url: "?blog-category=Business",
    },
    {
      name: "TRAVEL",
      url: "?blog-category=Travel",
    },
    {
      name: "FOOD",
      url: "?blog-category=Food",
    },
  ];
  return (
    <div className="w-full overflow-hidden flex sm:flex-row flex-col justify-center items-center gap-3">
      <div className=" py-3 flex w-full lg:overflow-hidden overflow-scroll">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-2 rtl:space-x-reverse text-base">
            {homeNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  className={`text-gray-900 dark:text-white cursor-pointer py-1 px-5 rounded-lg ${
                    activeNavItem === item.name
                      ? "dark:bg-blue-800 bg-blue-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  } transition-all duration-300`}
                  to={item.url}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
        <div className=" w-full flex">
          <HomeNavSearch />
        </div>
    </div>
  );
}

export default HomeNav;
