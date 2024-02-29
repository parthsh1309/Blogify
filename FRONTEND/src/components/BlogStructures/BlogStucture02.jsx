import React from "react";
import { Link } from "react-router-dom";
import {KebabMenu} from "../index";

function BlogStructure({
  blog,
  classNamePrimary,
  classNameSecondary,
  classNameTitle,
  classNameText,
  textMaxLength = 100,
}) {
  return (
    <div
      className={`w-full h-auto bg-no-repeat bg-left bg-cover p-3 relative ${classNamePrimary}`}
      style={{ backgroundImage: `url(${blog.coverImage.url})` }}
    >
      <KebabMenu blogId={blog.uuid} userId={blog.author._id}/>
      <Link
        to={`/blog/${blog.uuid}`}

        // key={blog.uuid}
      >
        <div
          className={` ${classNameSecondary}sm:w-1/2 w-2/3 bg-gray-700/80 dark:bg-slate-950/80 px-3 py-5 space-y-2 rounded-xl flex-shrink-0 `}
        >
          <div className=" text-gray-400 pb-4">
            {new Date(blog.createdAt).getDate() +
              "/" +
              (new Date(blog.createdAt).getMonth() +
                1 +
                "/" +
                new Date(blog.createdAt).getFullYear())}{" "}
            -- {blog.time || "5"} min read
          </div>
          <div className={`font-semibold font-merri ${classNameTitle}`}>
            {blog.title}
          </div>
          <div className={`text-gray-400 ${classNameText}`}>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.text?.substring(0, textMaxLength) + "...",
              }}
            />
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
    </div>
  );
}

export default BlogStructure;
