import React, { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import {
  BiEditAlt,
  BiCalendarAlt,
} from "react-icons/bi";
import "./task.css";


import AddTask from "./AddTask";

export default function SubTask({ subTask }) {
    const {id, title, description, dueDate} = subTask
    const [hover, setHover] = useState(false);
    const [edit, setEdit] = useState(false);


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
                    <input className="form-check-input" type="radio" name={title} id={id}/>
                    <label className="form-check-label fs-10" htmlFor={id}>
                        {title}
                    </label>
                </div>

                {description && (
                    <div className="w-100 additional-text text-muted container fs-10">
                        {description}
                    </div>
                )}
                {dueDate && (
                <div className="additional-text">
                    {dueDate && (
                    <span className="text-danger ">
                        <BiCalendarAlt /> {dueDate}
                    </span>
                    )}
                </div>
                )}
            </div>
            <div className="icons d-flex sub-task-icons-wrapper">
                <BiEditAlt onClick={() => setEdit(true)} style={hover ? { opacity: 1 } : { opacity: 0 }}/>
                <BsThreeDots style={hover ? { opacity: 1 } : { opacity: 0 }} />
            </div>
            </div>
        )}
        </div>
    );
    }
