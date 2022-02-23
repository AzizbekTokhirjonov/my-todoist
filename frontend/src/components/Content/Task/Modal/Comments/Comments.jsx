import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import "../modal.css";
import CommentsContent from "./CommentsContent";
import CommentsInput from "./CommentsInput";
import Loader from "../../../../Loader";
import { fetchCommentsAction } from "../../../../../redux/actions/commentsActions";



const Comments = ({taskId}) => {

  const {comments, createComment, updateComment, deleteComment, fetchComments} = useSelector(state => state.commentsOps)
  
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchCommentsAction(taskId))
    
  }, [ dispatch, taskId])

  return (
    <div id="comments-container">
      <div id="comments-content">
        { createComment.loading || updateComment.loading || deleteComment.loading || fetchComments.loading ? <Loader/> : comments.map(comment => <CommentsContent comment={comment} key={comment._id}/>)}
      </div>
      <div id="comments-input">
        <CommentsInput />
      </div>
    </div>
  );
};

export default Comments;
