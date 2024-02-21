import React, { useState } from "react";
import { Logo, PrimaryBtn, ThemeSwitch } from "../index";
import { Link, NavLink, Navigate } from "react-router-dom";
import MainMenuBtn from "./MainMenuBtn";
import ProfileBtn from "./ProfileBtn";
import ProfileData from "./ProfileData";
import NavItems from "./NavItems";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const toggleMenu = () => {
    setIsProfileOpen(false)
    setIsMenuOpen(!isMenuOpen);
  };

  function closeProfile() {
    setIsProfileOpen(false);
  }


  const toggleProfile = () => {
    setIsMenuOpen(false)
    setIsProfileOpen(!isProfileOpen);
  };


  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 shadow-xl dark:shadow-white/5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
          {/* get started btn */}
          <PrimaryBtn navUrl="/add-post" className="hidden lg:flex">
            Post A Blog
          </PrimaryBtn>

          {/* profile btn */}
          <ProfileBtn onClick={toggleProfile}/>

          {/* main menu btn */}
          <MainMenuBtn onClick={toggleMenu} />
        </div>
       
       
       <ProfileData isProfileOpen={isProfileOpen} closeProfile={closeProfile}/>


       <NavItems isMenuOpen={isMenuOpen} />
        
      </div>
    </nav>
  );
}

export default Navbar;
