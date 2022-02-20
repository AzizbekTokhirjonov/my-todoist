import React, { useEffect, useState } from "react";
import { BiLabel } from "react-icons/bi";
import { BsAlarm, BsFlagFill, BsCalendar2Event } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import CustomDatePicker from "../CustomDatePicker";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../Menu";
import { postTask, updateTask } from "../../../redux/actions/taskActions";
import { format } from "date-fns";
import { fetchAllLabels } from "../../../redux/actions/labelActions";



const today = new Date();


const tempPriorityList = [
  {
    _id: 1,
    title: "Low",
    type: 'priority'
  },
  {
    _id: 2,
    title: "Medium",
    type: 'priority'
  },
  {
    _id: 3,
    title: "High",
    type: 'priority'
  },
  {
    _id: 4,
    title: "Dream",
    type: 'priority'
  }
]

const AddTask = ({
  setAddTask,
  task = { title: "", description: "" },
  setEdit,
  title = "",
}) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [taskTitle, setTaskTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [taskLabel, setTaskLabel] = useState(task.label || {});
  const [dueDate, setDueDate] = useState(task.dueDate || today);
  const [priority, setPriority] = useState(task.priority || {title: 'Low'});
  const [openLabelMenu, setOpenLabelMenu] = useState(null);
  const [openPriorityMenu, setOpenPriorityMenu] = useState(null);
  
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user.userDetails);
  const {labels} = useSelector((state) => state.labelProps)
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const taskObject = {
    title: taskTitle,
    description,
    label: taskLabel._id,
    dueDate: new Date(dueDate),
    priority: priority === "" ? "Low" : priority.title,
    owner: user._id,
  };


  useEffect(() => {
      dispatch(fetchAllLabels())
  }, []);


  let priorityColor;
  switch (priority) {
    case "High":
      priorityColor = "red";
      break;
    case "Medium":
      priorityColor = "orange";
      break;
    case "Dream":
      priorityColor = "blue";
      break;
    default:
      priorityColor = "green";
      break;
  }
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
              required
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
              required
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
                    setDueDate={setDueDate}
                    dueDate={dueDate}
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
                    <BsCalendar2Event className="mr-1" />{" "}
                    {task.dueDate
                      ? format(new Date(task.dueDate), "dd/MM/yyyy")
                      : "Schedule"}
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
                    style={{color: taskLabel.color}}
                  />
                  {taskLabel && taskLabel.title}
                  <Menu
                    openMenu={openLabelMenu}
                    closeMenu={setOpenLabelMenu}
                    menuItems={labels ? labels : []}
                    setItem={setTaskLabel}
                    title="label"
                  />
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                TransitionProps={{ timeout: 600 }}
                title="Set the priority"
              >
                <div>
                  <BsFlagFill
                    color={priorityColor}
                    size={20}
                    onClick={(e) => setOpenPriorityMenu(e.currentTarget)}
                    aria-controls={openPriorityMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPriorityMenu ? "true" : undefined}
                  />
                  {priority && priority.title}
                  <Menu
                    openMenu={openPriorityMenu}
                    closeMenu={setOpenPriorityMenu}
                    setItem={setPriority}
                    menuItems={tempPriorityList}
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
          onClick={(e) => {
            e.preventDefault();
            title === "checkTask" || title === "customModal"
              ? dispatch(updateTask(task._id, taskObject))
              : dispatch(postTask(taskObject));
            title === "checkTask" || title === "customModal"
              ? setEdit(false)
              : setAddTask(false);
          }}
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
