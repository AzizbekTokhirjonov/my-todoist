import React, { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import { BiEditAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";

const CommentsContent = () => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <div>
          <div id="add-task-card">
            <div className="description">
              <TextField
                multiline
                minRows={2}
                placeholder="Description"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => {
                setEdit(false);
              }}
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
        </div>
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
                    <b>Azizbek Tokhirjonov</b>
                  </div>
                  <div className="comment">Awesome!</div>
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
                <MdDeleteOutline
                  style={hover ? { opacity: 1 } : { opacity: 0 }}
                />
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
