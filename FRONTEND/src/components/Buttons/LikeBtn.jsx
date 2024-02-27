import React, { useEffect, useState } from "react";
import blogService from "../../databaseService/Blog";
import { useSelector } from "react-redux";

function LikeBtn({ likes = [], id }) {
    const auth = useSelector(state => state.auth);
  const [blogLiked, setBlogLiked] = useState(false);
  console.log(auth);

  const onClick = () => {
      setBlogLiked(!blogLiked);
      likes.includes(auth.userData.data._id) ? likes.splice(likes.indexOf(auth.userData.data._id), 1) : likes.push(auth.userData.data._id);
      blogService.LikeBlog(id).then((res) => {
        //   console.log(res);
        });
  };

  useEffect(() => {
   likes.includes(auth.userData.data._id) ? setBlogLiked(true) : setBlogLiked(false);
//    console.log(likes.includes());
  }, []);

  return (
    <button
      className={`py-2 px-3 text-sm font-merri rounded-lg bg-blue-800 text-white flex items-center gap-1 space-x-1`}
      onClick={onClick}
    >
      <span
        className=" transition-all duration-400 material-symbols-outlined"
        style={{
          fontVariationSettings: `${blogLiked ? `"FILL" 1` : `"FILL" 0`}`,
        }}
      >
        thumb_up
      </span>
      <span className="text-lg"> {likes.length} </span> Like
    </button>
  );
}

export default LikeBtn;
