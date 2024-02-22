import React from "react";
import HomeNav from "./nav/HomeNav";
import Blog from "./Blog";
import TopLikedBlogs from "./TopLikedBlogs";
import TrendingBlogs from "./TrendingBlogs";

function Home() {
  return (
    <>
      <div className="px-2 text-white">
        <HomeNav />
        <Blog />
      </div>
      <div className="px-5 py-4 text-white flex sm:flex-wrap mb-8 justify-between items-center gap-5 flex-wrap-reverse">
        <TopLikedBlogs />
        <TrendingBlogs />
      </div>
    </>
  );
}

export default Home;
