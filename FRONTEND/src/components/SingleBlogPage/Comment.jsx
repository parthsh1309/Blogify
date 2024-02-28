import React, { useEffect, useState } from "react";
import FloatingInput from "../Inputs/FloatingInput";
import SecondaryBtn from "../Buttons/SecondaryBtn";
import { useForm } from "react-hook-form";
import blogService from "../../databaseService/Blog";

function Comment({ uuid }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  const fetchComments = () => {
    setLoading(true);
    setError(null);
    blogService
      .getBlogComments(uuid)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching comments.");
      })
      .finally(() => setLoading(false));
  };

  const addComment = (data, e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    if (!data) return setError("Please fill in the form.");
    blogService
      .addComments(uuid, data.content)
      .then((res) => {
        fetchComments(); // Fetch comments again after adding a new comment
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message || "An error occurred while adding a comment.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComments(); // Initial fetch of comments
  }, [uuid]); // Run useEffect whenever `uuid` changes

  return (
    <div className="w-full flex flex-wrap justify-around">
      <div className="sm:w-2/4 w-full sm:p-0 p-3 h-screen">
        <div className="bg-gray-950 rounded-xl text-white px-5 py-3 space-y-3 h-5/6 overflow-y-scroll">
          <h1 className="text-3xl font-roboSlab font-semibold text-center underline">
            Comments
          </h1>
          {comments.length ? (
            comments?.map((comment) => (
              <div
                className="w-fit bg-gray-500/30 py-2 px-4 flex rounded-full"
                key={comment.id}
              >
                <span className="text-4xl material-symbols-outlined py-1 pr-2">
                  account_circle
                </span>
                <div className="">
                  <span className="text-sm text-gray-600">
                    {comment.author.username}
                  </span>
                  <p className="m-auto">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-3xl font-merri font-semibold flex items-center justify-center h-full  bg-yellow">
              <h1 className="">
                No comments yet
              </h1>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(addComment)} className="w-full relative">
          <FloatingInput
            text="Leave a comment"
            className="py-1"
            autoComplete="off" // Corrected typo
            name="content"
            {...register("content")}
          />
          <SecondaryBtn
            type="submit"
            className="absolute bottom-2 right-3 top-2 m-auto"
            children
          />
        </form>
      </div>
      <div className="sm:w-2/5 bg-white"> hehhe</div>
    </div>
  );
}

export default Comment;
