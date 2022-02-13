import React from "react";
import { GrAttachment, GrEmoji } from "react-icons/gr";
import { MdSettingsVoice } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
const CommentsInput = () => {
  return (
    <div id="add-comment-card" className="mx-auto">
      <div className="content">
        <div className="comments">
          <TextField
            multiline
            minRows={3}
            placeholder="Write a comment"
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true }}
          />
        </div>
      </div>
      <div className="actions">
        <div className="d-flex justify-content-between">
          <div className="icons d-flex ">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Attach a file"
            >
              <div>
                <label htmlFor="attach">
                  <GrAttachment size={25} />
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="attach"
                  name="attach"
                />
              </div>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Record audio"
            >
              <div>
                <MdSettingsVoice size={20} />
              </div>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Insert emoji"
            >
              <div>
                <GrEmoji size={20} />
              </div>
            </Tooltip>
          </div>
          <div className="btns ">
            <button
              className="btn btn-sm btn-dark"
              style={{ borderColor: "#ccc" }}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsInput;
