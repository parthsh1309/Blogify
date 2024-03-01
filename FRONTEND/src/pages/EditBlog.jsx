import React, { useEffect, useState } from "react";
import { PostForm } from "../components";
import { useParams } from "react-router-dom";
import blogService from "../databaseService/Blog";

function EditBlog() {
  const [blog, setBlog] = useState({});

  const { blogId } = useParams();
  useEffect(() => {
    blogService.getSingleBlog(blogId).then((res) => {
      if (!res) {
        throw new Error("Blog not found");
      }
      res.data.category = res.data.category[0];
      setBlog(res.data);
    });
  }, []);
  return <PostForm post={blog}/>;
}

export default EditBlog;
