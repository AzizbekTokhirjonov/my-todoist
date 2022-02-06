import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { BsThreeDots, BsSliders, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import AddTask from "./Task/AddTask";
import CheckTask from "./Task/CheckTask";
import "./Task/task.css";
import CustomModal from "./Task/Modal/CustomModal";
import AddTaskIcon from "./Task/AddTaskIcon";

const Inbox = () => {
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState("");
  const [addTask, setAddTask] = useState(false);
  const sections = [];
  // const [value, setValue] = React.useState('female');
  // const [tasks, setTasks] = useState([])
  const tasks = [
    {
      title: "Do something",
      id: 1,
      description: "Something to do",
      dueDate: "tomorrow",
      priority: "P1",
      label: "idle",
    },
    {
      id: 2,
      title: "Build task",
      description: "Build task app",
      dueDate: "next monday",
      priority: "P3",
      label: "coding",
    },
    {
      id: 4,
      title: "Check Component",
      description: "check components for erros",
      dueDate: "today",
      priority: "P1",
      label: "",
    },
    {
      id: 5,
      title: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      dueDate: "today",
      priority: "P1",
      label: "",
    },
    {
      title: "Do something",
      id: 6,
      description: "",
      dueDate: "",
      priority: "P5",
      label: "",
    },
  ];

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
          <React.Fragment key={task.id}>
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
