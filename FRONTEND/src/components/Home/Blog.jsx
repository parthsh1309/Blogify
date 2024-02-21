import React, { useEffect, useState } from "react";
import blogService from "../../databaseService/Blog";
import { useLocation } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const activeParam = params.get("blog-category");
      blogService.getBlogs(false, activeParam, 5).then((res) => {
        if (!res) return;
        setBlogs(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [location]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    blogs.length && (
      <div className="flex flex-wrap w-full h-screen py-2 px-3" >
        <div className="w-2/6 relative">
          <img src={blogs[0].coverImage.url} className="h-full" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 bg-gray-700/80 dark:bg-slate-950/80 p-3 space-y-2 rounded-xl">
            {/* <div className="text-base text-gray-400 font-semibold">{new Date(blogs[0].createdAt)} -- 8 min read</div> */}
            <div className="text-2xl font-semibold">{blogs[0].title}</div>
            <div className="text-gray-400">{blogs[0].text.substring(0, 100)}...</div>
            <div className="flex space-x-3 items-center">
              <span className="dark:text-gray-400 bg-slate-700 py-1 px-3 rounded-full">{blogs[0].category[0]}</span>
              <span className="dark:text-gray-500 font-sans">by {blogs[0].author.username}</span>
            </div>
          </div>
        </div>
        {/* {blogs.map((blog) => blog.title)} */}
      </div>
    )
  );
}

export default Blog;
