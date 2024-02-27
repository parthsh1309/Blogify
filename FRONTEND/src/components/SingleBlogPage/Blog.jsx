import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import blogService from "../../databaseService/Blog";
import LikeBtn from "../Buttons/LikeBtn";
import DislikeBtn from "../Buttons/DislikeBtn";
import Comment from "./Comment";

function Blog() {
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [error, setError] = useState({ error: false, msg: "" });
  useEffect(() => {
    blogService.getSingleBlog(blogId).then((res) => {
      if (!res) setError({ error: true, msg: res.error || "Blog not found" });
      console.log(res.data);
      setBlog(res.data);

      setLoading(false);
    });
  }, []);
  return loading ? (
    <div>{error.msg} Loading...</div>
  ) : (
    <div className="w-full ">
      <div className="w-full items-center flex flex-wrap-reverse justify-center sm:gap-3 sm:space-x-9">
        <div className="space-y-2 ">
          <h1 className="text-4xl font-mont font-semibold text-gray-200 text-center py-2">
            {blog.title}
          </h1>
          <span className="font-mont text-gray-600 ml-10">
            -- {blog.time || "5"} min read
          </span>

          <Link className="flex gap-1 items-center bg-slate-700 w-72 m-auto  justify-center text-white rounded-full py-2 px-5 ">
            <span className="text-4xl  material-symbols-outlined">
              account_circle
            </span>
            <p className="text-xl font-mont">{blog.author.username}</p>
          </Link>
        </div>
        <img src={blog.coverImage.url} className="w-auto h-auto" alt="" />
      </div>
      <hr
        className="border-t border-gray-600 my-4 w-4/5 m-auto
      "
      />
      <div
        className="blogtext text-white px-6 py-4 space-y-2"
        dangerouslySetInnerHTML={{ __html: blog.text }}
      />
      <div className="flex ml-auto py-2 px-5 space-x-5">
        <LikeBtn likes={blog.likes} id={blog.uuid} />
        <DislikeBtn />
      </div>
      <hr
        className="border-t border-gray-600 my-4 w-4/5 m-auto
      "
      />
     <Comment />
    </div>
  );
}

export default Blog;
