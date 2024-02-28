import React, { useEffect, useState } from "react";
import { SearchBar } from "..";
import blogService from "../../databaseService/Blog";
import {BlogStructure02} from "../index";
import Pagination from "./Pagination";

function Blogs({ filterVisible, setFilterVisible, filters, setFilters }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // checking if languages and categories are empty if yes then set them to default
    const language =
      !filters.Language?.length < 0
        ? ["English"]
        : filters.Language || ["English"];

    const category =
      !filters.Category?.length < 0
        ? ["All"]
        : filters.Category || [
            "All",
            "Food",
            "Travel",
            "Lifestyle",
            "Business",
            "Technology",
          ];

    // get all blogs from the database and set them to the state
    blogService
      .getBlogs(false, category, 8, "-createdAt", language, filters.Time)
      .then((res) => {
        // console.log(res.data);
        return setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, [filters]);

  return (
    <div className="sm:w-3/4">
      <div className="flex justify-center items-center gap-2">
        <button
          className="sm:hidden text-lg text-white text-center border border-gray-700 w-fit m-auto py-2 px-4 rounded-full font-merri bg-gray-900 flex items-center gap-2"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <span className="text-lg material-symbols-outlined">tune</span>
          Filters
        </button>
        <SearchBar />
      </div>

      <div className="sm-w-full flex flex-wrap gap-3 p-4 justify-center rounded-2xl">
        {blogs?.map((blog) => (
          <BlogStructure02
            key={blog.uuid}
            blog={blog}
            classNameTitle={"text-white sm:text-3xl text-2xl"}
            classNamePrimary={"rounded-2xl"}
          />
        ))}
        <Pagination />
      </div>
    </div>
  );
}

export default Blogs;
