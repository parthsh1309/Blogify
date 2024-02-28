import React, { useEffect, useState } from "react";
import blogService from "../../databaseService/Blog";
import BlogStructure from "../Home/BlogStructure";

function MoreBlogs({ Category, uuid }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get all blogs from the database and set them to the state
    blogService.getBlogs(false, Category, 3, "-createdAt").then((res) => {
      if (!res) return;
      setBlogs(res.data);
    });
    setLoading(false);
  }, []);
  return !loading ? (
    <div className="sm:w-2/5 w-full sm:h-screen sm:overscroll-y-scroll">
        <h1 className="text-3xl font-roboSlab text-center text-white">More Like This</h1>
      <div className="w-full p-4">
        {blogs.map((blog) =>
          blog.uuid === uuid ? null : (
            <BlogStructure blogs={blog} classNameTitle={"text-white sm:text-3xl text-2xl"} key={blog.uuid}/>
          )
          
        )}
      </div>
    </div>
  ) : (
    <div>loading....</div>
  );
}

export default MoreBlogs;
