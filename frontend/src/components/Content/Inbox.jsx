import React, { useState, useEffect } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { BsThreeDots, BsSliders } from "react-icons/bs";
import AddTask from "./Task/AddTask";
import CheckTask from "./Task/CheckTask";
import "./Task/task.css";
import CustomModal from "./Task/Modal/CustomModal";
import AddTaskIcon from "./Task/AddTaskIcon";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/actions/taskActions";
const Inbox = () => {
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.list);
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const sections = [];

  const addSection = (e) => {
    e.preventDefault();
    sections.push(section);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      addSection(e);
    }
  };

  return (
    <div id="inbox" className="mx-auto">
      <CustomModal />
      <div className="d-flex justify-content-between">
        <div className="title">
          <h4>Inbox</h4>
        </div>
        <div className="items">
          <ul className="d-flex">
            <li>
              <FaRegCommentAlt />
              <span> Comments</span>
            </li>
            <li>
              <BsSliders />
              <span> Views</span>
            </li>
            <li>
              <BsThreeDots />
            </li>
          </ul>
        </div>
      </div>

      <div className="tasks-wrapper">
        {tasks.map((task) => (
          <React.Fragment key={task._id}>
            <CheckTask task={task} />
            <hr />
          </React.Fragment>
        ))}
      </div>

      {addTask ? (
        <AddTask setAddTask={setAddTask} />
      ) : (
        <AddTaskIcon
          setAddTask={setAddTask}
          setHover={setHover}
          hover={hover}
        />
      )}

      <div
        className="add-section mt-4"
        style={{ height: "10px", width: "100%" }}
      >
        <TextField
          fullWidth
          id="add-section"
          label="Add Section"
          type="text"
          variant="standard"
          value={section}
          onChange={(e) => {
            setSection(e.target.value);
          }}
          //   onKeyPress={(e) => {
          //     handleKeypress(e);
          //   }}
          onKeyDown={handleKeypress}
          tabIndex="0"
        />
        <div className="d-flex mt-2">
          {section.length > 1 ? (
            <button
              type="submit"
              onClick={addSection}
              className="btn btn-secondary btn-sm"
            >
              Add Section
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" disabled>
              Add Section
            </button>
          )}
          <div className="btn btn-sm">Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
