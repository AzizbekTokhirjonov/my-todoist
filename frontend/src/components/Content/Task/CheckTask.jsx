import React, { useState, useEffect } from "react";
import {
  BiEditAlt,
  BiComment,
  BiCalendarAlt,
  BiLabel,
  BiCalendarEdit,
  BiGitMerge,
} from "react-icons/bi";
import "./task.css";
import { useDispatch } from "react-redux";
import { handleOpen } from "../../../redux/actions/actions";
import AddTask from "./AddTask";
import { MdDeleteOutline } from "react-icons/md";
import CustomDatePicker from "../CustomDatePicker";
import format from "date-fns/format";
import { getTasks, updateTask } from "../../../redux/actions/taskActions";
const url = process.env.REACT_APP_DEV_URL;

export default function CheckTask({ task }) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [checked, setChecked] = useState(task.completed);
  const dispatch = useDispatch();

  const deleteTask = async (id) => {
    console.log(`${url}/tasks/${id}`);
    const response = await fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(getTasks());
    }
  };

  const handleChange = () => {
    setChecked(!checked);
    const updatedTask = {
      completed: !checked,
    };
    dispatch(updateTask(task._id, updatedTask));
    console.log("checked:", checked);
  };
  return (
    <div className="wrapper">
      {edit ? (
        <AddTask task={task} setEdit={setEdit} title="checkTask" />
      ) : (
        <div
          className="d-flex justify-content-between py-2 wrapper"
          onMouseOut={() => setHover(false)}
          onMouseOver={() => setHover(true)}
          key={task._id}
        >
          <div className="text">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={task.title}
                id={task._id}
                checked={checked}
                onClick={handleChange}
              />
              <div
                onClick={() => dispatch(handleOpen(task))}
                className="form-check-label"
                style={
                  task.completed ? { textDecoration: "line-through" } : null
                }
              >
                {task.title}
              </div>
            </div>

            {task.description && (
              <div
                className="w-100 additional-text text-muted"
                onClick={() => dispatch(handleOpen(task))}
              >
                {task.description.substring(0, 110)}...
              </div>
            )}
            <div className="additional-text">
              {task.subTasks.length > 0 && (
                <span className="text-muted">
                  <BiGitMerge /> 0/{task.subTasks.length}
                </span>
              )}
              {task.label && (
                <span className="text-warning">
                  <BiLabel /> {task.label.title}
                </span>
              )}
              {!showCalendar ? (
                <span>
                  <CustomDatePicker
                    setShowCalendar={setShowCalendar}
                    showCalendar={showCalendar}
                    task={task}
                  />
                </span>
              ) : (
                <label
                  htmlFor="date-picker"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span>
                    <BiCalendarAlt />
                    {format(new Date(task.dueDate), "dd/MM/yyyy") || "Schedule"}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="icons d-flex">
            <BiEditAlt
              onClick={() => setEdit(true)}
              style={hover ? { opacity: 1 } : { opacity: 0 }}
            />
            <BiCalendarEdit style={hover ? { opacity: 1 } : { opacity: 0 }} />
            <BiComment
              onClick={() => dispatch(handleOpen(task))}
              style={hover ? { opacity: 1 } : { opacity: 0 }}
            />
            <MdDeleteOutline
              onClick={() => deleteTask(task._id)}
              style={hover ? { opacity: 1 } : { opacity: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
