import React from "react";
import { BiLabel } from "react-icons/bi";
import { BsAlarm, BsFlag, BsCalendar2Event } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
const AddTask = ({
  setAddTask,
  title = "",
  description = "",
  editing = false,
}) => {
  return (
    <div>
      <div id="add-task-card">
        <div className="content">
          <div className="title">
            <TextField
              fullWidth
              variant="standard"
              value={title}
              placeholder="e.g., Finish info component by evening"
              InputProps={{ disableUnderline: true }}
              style={{ fontSize: "12px" }}
            />
          </div>
          <div className="description">
            <TextField
              multiline
              minRows={2}
              value={description}
              placeholder="Description"
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
            />
          </div>
        </div>
        <div className="actions">
          <div className="d-flex justify-content-between">
            <div className="btns">
              <button
                className="btn btn-sm btn-light"
                style={{ borderColor: "#ccc" }}
              >
                <BsCalendar2Event className="mr-1" /> Schedule
              </button>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Select a project"
              >
                <button
                  className="btn btn-sm btn-light"
                  style={{ borderColor: "#ccc" }}
                >
                  <LocalPostOfficeIcon className="mr-1" /> Inbox
                </button>
              </Tooltip>
            </div>
            <div className="icons d-flex ">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Add label(s) @"
              >
                <div>
                  <BiLabel size={25} />
                </div>
              </Tooltip>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Set the priority"
              >
                <div>
                  <BsFlag size={20} />
                </div>
              </Tooltip>
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Add reminder(s)"
              >
                <div>
                  <BsAlarm size={20} />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setAddTask(false)}
        >
          {editing ? "Save" : "Add task"}
        </button>
        <button
          className="btn btn-sm btn-light m-2"
          style={{ borderColor: "#ccc" }}
          onClick={() => setAddTask(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTask;
