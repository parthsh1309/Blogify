import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitch } from "../../features/themeSwitch";

function ThemeSwitch({className}) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  const themeSwitchBtn = () => {
    dispatch(themeSwitch());
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDark) {
      html.classList.remove("light");
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }, [isDark]);

  return (
        <label className="relative inline-flex items-end cursor-pointer mt-3">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={themeSwitchBtn}
        // checked={themeMode === "light"}
        
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-500">
        {!isDark?'Dark':'Light'}
      </span>
    </label>
  );
}

export default ThemeSwitch;
