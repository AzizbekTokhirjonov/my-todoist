import React, { useState } from "react";
import { BiEditAlt, BiCalendarAlt } from "react-icons/bi";
import "./task.css";
import { MdDeleteOutline } from "react-icons/md";
import CustomDatePicker from "../CustomDatePicker.jsx";
import AddTask from "./AddTask";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteSubTask } from "../../../redux/actions/taskActions";


export default function SubTask({ subTask }) {
  const { _id: id, title, description, dueDate } = subTask;
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  const dispatch = useDispatch()
  const {openTask} = useSelector(state => state.modalState)

  const handleDelete = (subtaskId) => {
    dispatch(deleteSubTask(openTask._id, subtaskId))
  }

  return (
    <div>
      {edit ? (
        <AddTask task={subTask} setEdit={setEdit} title="checkTask" />
      ) : (
        <div
          className="d-flex justify-content-between wrapper"
          onMouseOut={() => setHover(false)}
          onMouseOver={() => setHover(true)}
          key={id}
        >
          <div className="text">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={title}
                id={id}
              />
              <label className="form-check-label fs-10" htmlFor={id}>
                {title}
              </label>
            </div>

            {description && (
              <div className="w-100 additional-text text-muted container fs-10">
                {description}
              </div>
            )}

            {!showCalendar ? (
              <div>
                <CustomDatePicker
                  setShowCalendar={setShowCalendar}
                  showCalendar={showCalendar}
                  task={subTask}
                />
              </div>
            ) : (
              <div className="additional-text">
                {dueDate ? (
                  <label
                    htmlFor="date-picker"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <span className="text-danger ">
                      <BiCalendarAlt /> {format(new Date(dueDate), "dd/MM/yyyy")}
                    </span>
                  </label>
                ) : (
                  <label
                    htmlFor="date-picker"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <span className="text-danger ">
                      <BiCalendarAlt /> Schedule
                    </span>
                  </label>
                )}
              </div>
            )}
          </div>
          <div className="icons d-flex sub-task-icons-wrapper">
            <BiEditAlt
              onClick={() => setEdit(true)}
              style={hover ? { opacity: 1 } : { opacity: 0 }}
            />
            <MdDeleteOutline style={hover ? { opacity: 1 } : { opacity: 0 }} onClick={(e) => handleDelete(id)} />
          </div>
        </div>
      )}
    </div>
  );
}
