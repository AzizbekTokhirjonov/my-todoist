import React from "react";
import "../modal.css";
import CommentsContent from "./CommentsContent";
import CommentsInput from "./CommentsInput";
const Comments = () => {
  return (
    <div id="comments-container">
      <div id="comments-content">
        <CommentsContent />
      </div>
      <div id="comments-input">
        <CommentsInput />
      </div>
    </div>
  );
};

export default Comments;
