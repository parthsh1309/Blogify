import React, { useEffect, useState } from "react";
import AsideNav from "./AsideNav";
import dashboardService from "../../databaseService/dashboard";
import { BlogStructure02, BlogStructure } from "../../components";
import { useSelector } from "react-redux";

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const refreshState = useSelector((state) => state.auth.refreshStatus);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await dashboardService.getUserBlogs();
        setBlogs(res.data.blogPosts); // Update the state with blog posts array
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    // Call the fetchBlogs function
    fetchBlogs();
  }, [refreshState]);



  return (
    <div className="sm:flex relative space-y-5 w-full sm:h-screen">
      <AsideNav />

      <div className="sm:w-3/4 overflow-y-scroll ">
        <h1 className="sm:text-3xl text-xl text-white font-mont uppercase py-4 text-center w-full">
          My Blogs
        </h1>
        {blogs.length ? (
          <div className="w-full h-full space-y-4 p-3">
            {blogs.map((blog) => (
               <BlogStructure02
               key={blog.uuid}
               blog={blog}
               classNameTitle={"text-white sm:text-3xl text-2xl"}
               classNamePrimary={"rounded-2xl"}
             />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center sm:h-4/5">
            <p className="text-center text-white text-5xl">No Blogs Found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBlogs;
