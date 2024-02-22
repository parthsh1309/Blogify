import React from "react";

function BlogStructure({
  blogs,
  classNamePrimary,
  classNameSecondary,
  classNameDate,
  classNameTitle,
  classNameText,
  classNameCategory,
}) {
  return (
    <div className={` relative ${classNamePrimary} `}>
      <img src={blogs.coverImage.url} className="h-full w-full rounded-xl " loading="eager"/>
      <div
        className={`absolute bottom-4 left-2/4 transform -translate-x-1/2 w-5/6 bg-gray-700/80 dark:bg-slate-950/80 p-3 space-y-2 rounded-xl flex-shrink-0 ${classNameSecondary}`}
      >
        <div className={` text-gray-400 ${classNameDate}`}>
          {new Date(blogs.createdAt).getDate() +
            "/" +
            (new Date(blogs.createdAt).getMonth() +
              1 +
              "/" +
              new Date(blogs.createdAt).getFullYear())}{" "}
          -- {blogs._id.substring(0, 2)} min read
        </div>
        <div className={`font-semibold font-merri ${classNameTitle}`}>
          {blogs.title}
        </div>
        <div className={`text-gray-400 ${classNameText}`}>
          {blogs.text.substring(0, 100)}...
        </div>
        <div className={`flex space-x-3 items-center ${classNameCategory}`}>
          <span className="dark:text-gray-400 bg-slate-700 py-1 px-3 rounded-full">
            {blogs.category[0]}
          </span>
          <span className="dark:text-gray-500 font-mont font-medium">
            by {blogs.author.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogStructure;
