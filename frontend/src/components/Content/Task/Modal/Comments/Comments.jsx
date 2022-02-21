import React from "react";
import "../modal.css";
import CommentsContent from "./CommentsContent";
import CommentsInput from "./CommentsInput";



const Comments = (comments) => {

  

  return (
    <div id="comments-container">
      <div id="comments-content">
        {comments.comments.map(comment => <CommentsContent comment={{...comment}} key={comment._id}/>)}
      </div>
      <div id="comments-input">
        <CommentsInput />
      </div>
    </div>
  );
};

export default Comments;
