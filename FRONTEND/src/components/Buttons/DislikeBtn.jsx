import React, { useState } from "react";

function DislikeBtn() {

    const [disliked, setDisliked] = useState(false);
  return (
    <button
      className={`py-2 px-3 text-sm font-merri rounded-lg bg-red-800 text-white flex items-center space-x-2`} onClick={() => setDisliked(!disliked)}
    >
      <span
        className=" transition-all duration-400 material-symbols-outlined "
    
        style={{fontVariationSettings: `${disliked?`"FILL" 1`:`"FILL" 0` }` }}
      >
        thumb_down
      </span>
      <span className=""> Dislike</span>
    </button>
  );
}

export default DislikeBtn;
