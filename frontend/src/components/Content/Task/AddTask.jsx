import React, { useEffect, useState } from "react";
import { BiLabel } from "react-icons/bi";
import { BsAlarm, BsFlag, BsCalendar2Event } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import CustomDatePicker from "../CustomDatePicker";
import Menu from "../Menu";

const AddTask = ({
  setAddTask,
  task = { title: "", description: "" },
  setEdit,
  title = "",
}) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [taskTitle, setTaskTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [taskLabel, setTaskLabel] = useState(task.label || "");

  const [openLabelMenu, setOpenLabelMenu] = useState(null);
  const [openPriorityMenu, setOpenPriorityMenu] = useState(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {}, [openLabelMenu]);

  let buttonTitle;
  switch (title) {
    case "checkTask": {
      buttonTitle = "Save";
      break;
    }
    case "subPanel": {
      buttonTitle = "Add sub-task";
      break;
    }
    case "customModal": {
      buttonTitle = "Save";
      break;
    }
    default: {
      buttonTitle = "Add task";
      break;
    }
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div id="add-task-card">
        <div className="content">
          <div className="title">
            <TextField
              fullWidth
              variant="standard"
              value={taskTitle}
              placeholder="e.g., Finish info component by evening"
              InputProps={{ disableUnderline: true }}
              style={{ fontSize: "12px" }}
              onChange={(e) => setTaskTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="actions">
          <div className="d-flex justify-content-between">
            <div className="btns">
              {!showCalendar ? (
                <div className="ml-2">
                  <CustomDatePicker
                    setShowCalendar={setShowCalendar}
                    showCalendar={showCalendar}
                    task={task}
                  />
                </div>
              ) : (
                <label
                  onClick={() => setShowCalendar(!showCalendar)}
                  htmlFor="date-picker"
                >
                  <button
                    className="btn btn-sm btn-light"
                    style={{ borderColor: "#ccc" }}
                  >
                    <BsCalendar2Event className="mr-1" /> Schedule
                  </button>
                </label>
              )}

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
                placement="top"
                TransitionProps={{ timeout: 600 }}
                title="Add label(s) @"
              >
                <div>
                  <BiLabel
                    size={25}
                    onClick={(e) => setOpenLabelMenu(e.currentTarget)}
                    aria-controls={openLabelMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openLabelMenu ? "true" : undefined}
                  />
                  {taskLabel.length && taskLabel}
                  <Menu
                    openMenu={openLabelMenu}
                    closeMenu={setOpenLabelMenu}
                    menuItems={["green", "blue"]}
                  />
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                TransitionProps={{ timeout: 600 }}
                title="Set the priority"
              >
                <div>
                  <BsFlag
                    size={20}
                    onClick={(e) => setOpenPriorityMenu(e.currentTarget)}
                    aria-controls={openPriorityMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPriorityMenu ? "true" : undefined}
                  />
                  <Menu
                    openMenu={openPriorityMenu}
                    closeMenu={setOpenPriorityMenu}
                    menuItems={[
                      "1-Priority",
                      "2-Priority",
                      "3-Priority",
                      "4-Priority",
                    ]}
                  />
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
          type="submit"
          className="btn btn-sm btn-secondary"
          onClick={() =>
            title === "checkTask" || title === "customModal"
              ? setEdit(false)
              : setAddTask(false)
          }
        >
          {buttonTitle}
        </button>
        <button
          className="btn btn-sm btn-light m-2"
          style={{ borderColor: "#ccc" }}
          onClick={() =>
            title === "checkTask" || title === "customModal"
              ? setEdit(false)
              : setAddTask(false)
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTask;
