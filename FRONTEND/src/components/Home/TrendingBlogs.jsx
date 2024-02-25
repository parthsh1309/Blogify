import React, { useEffect, useState } from "react";
import blogService from "../../databaseService/Blog";
import { Link } from "react-router-dom";

function TrendingBlogs() {
  // TODO: sort posts as per Views
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getBlogs(false, "All", 10, "likes")
      .then((res) => {
        if (!res) return;
        setBlogs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);
  return (
    <div className="sm:w-1/3">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-mont font-semibold">Trending</h1>
        <p className="bg-gray-700 w-full " style={{ height: "1px" }}></p>
      </div>

      <div className="flex flex-wrap gap-3 w-full">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Link className="h-36 w-full flex gap-3">
              <img
                src={blog.coverImage.url}
                className="h-full w-1/3"
                alt=""
                loading="lazy"
              />
              <div className="flex flex-col gap-2 w-full p-2">
                <div className="text-gray-400 text-xs sm:font-bold font-mont">
                  {new Date(blog.createdAt).getDate() +
                    "/" +
                    (new Date(blog.createdAt).getMonth() +
                      1 +
                      "/" +
                      new Date(blog.createdAt).getFullYear())}{" "}
                  -- {blog.time || '5'} min read
                </div>
                <div className="font-semibold font-merri text-lg">{blog.title.substring(0, 20)}...</div>
                <div className={`text-gray-400 text-sm`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.text?.substring(0, 40) + "...",
                  }}
                />
              </div>
                <div className="flex space-x-3 items-center">
                  <span className="dark:text-gray-400 bg-slate-700 text-base py-1 px-2 rounded-full">
                    {blog.category[0]}
                  </span>
                  <span className="dark:text-gray-500 font-mont font-medium text-sm">
                    by {blog.author.username}
                  </span>
                </div>
              </div>
            </Link>
            <p className="bg-gray-800 w-full " style={{ height: "1px" }}></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingBlogs;
