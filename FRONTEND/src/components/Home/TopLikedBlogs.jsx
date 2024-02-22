import React, { useEffect, useState } from "react";
import blogService from "../../databaseService/Blog";
import { Link } from "react-router-dom";

function TopLikedBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getBlogs(false, "All", 8, "likes")
      .then((res) => {
        if (!res) return;
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    blogs.length ? (
      <div className="flex flex-col sm:w-3/5 py-2 sm:px-4 gap-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-mont font-semibold">What We Love</h1>
          <p className="bg-gray-700 w-full " style={{ height: "2px" }}></p>
        </div>

        <div className="flex flex-wrap gap-3">
          {blogs.map((blog) => (
            <Link
              className=" w-full h-auto bg-no-repeat bg-left bg-cover p-3"
              style={{ backgroundImage: `url(${blog.coverImage.url})` }}
              key={blog.uuid}
            >
              <div className="sm:w-1/2 w-2/3 bg-gray-700/80 dark:bg-slate-950/80 px-3 py-5 space-y-2 rounded-xl flex-shrink-0">
                <div className=" text-gray-400 pb-4">
                  {new Date(blog.createdAt).getDate() +
                    "/" +
                    (new Date(blog.createdAt).getMonth() +
                      1 +
                      "/" +
                      new Date(blog.createdAt).getFullYear())}{" "}
                  -- {blog._id.substring(0, 2)} min read
                </div>
                <div className="font-semibold font-merri">{blog.title}</div>
                <div className="text-gray-400">
                  {blog.text.substring(0, 100)}...
                </div>
                <div className="flex space-x-3 items-center">
                  <span className="dark:text-gray-400 bg-slate-700 py-1 px-3 rounded-full">
                    {blog.category[0]}
                  </span>
                  <span className="dark:text-gray-500 font-mont font-medium">
                    by {blog.author.username}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* TODO: Add pagination */}
          <div className="flex">
            <Link
              className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </Link>
            <Link
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    ): <div>No blogs found</div>
  );
}

export default TopLikedBlogs;
