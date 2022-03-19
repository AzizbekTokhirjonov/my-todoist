import React, { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import { BiEditAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux"
import {deleteComment, updateComment} from "../../../../../redux/actions/commentsActions"

const CommentsContent = ({taskId, comment}) => {

  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);

  const [commentText, setCommentText] = useState(comment.comment)

  const dispatch = useDispatch()
  const {userDetails} = useSelector(state => state.user)
  const handleFormSubmit = (e) => {
    e.preventDefault()
    setEdit(false)
    dispatch(updateComment(taskId, comment._id, {comment: commentText}))
  }

  return (
    <>
      {edit ? (
        <form onSubmit={handleFormSubmit}>
          <div id="add-task-card">
            <div className="description">
              <TextField
                multiline
                minRows={2}
                placeholder="Description"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-dark"
              type="submit"
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-light m-2"
              style={{ borderColor: "#ccc" }}
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ul>
            <li
              className="d-flex justify-content-between"
              onMouseOut={() => setHover(false)}
              onMouseOver={() => setHover(true)}
            >
              <div className="content d-flex">
                <div className="icon mr-3">
                  <FaUserCircle />
                </div>
                <div className="text">
                  <div className="username">
                    <b>{comment.author.firstName} {comment.author.lastName}</b>
                  </div>
                  <div className="comment">{comment.comment}</div>
                </div>
              </div>
              <div className="icons d-flex">
                <div
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <BiEditAlt style={hover ? { opacity: 1 } : { opacity: 0 }} />
                </div>
                {userDetails._id === comment.author._id && <MdDeleteOutline
                  style={hover ? { opacity: 1 } : { opacity: 0 }}
                  onClick={e => dispatch(deleteComment(taskId, comment._id))}
                />}
                <GrEmoji style={hover ? { opacity: 1 } : { opacity: 0 }} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CommentsContent;
