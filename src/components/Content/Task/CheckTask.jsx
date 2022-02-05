import React, {useState} from 'react';

import { BsThreeDots  } from "react-icons/bs";
import { BiEditAlt, BiComment, BiCalendarAlt, BiLabel, BiCalendarEdit} from "react-icons/bi";
import "./task.css"



export default function CheckTask({task}) {
    const [hover, setHover] = useState(false);

  

  return (
    <div className="d-flex justify-content-between py-2 wrapper"     onMouseOut={() => setHover(false)}
    onMouseOver={() => setHover(true)} >
        <div className="text">
        <div class="form-check">
            <input className="form-check-input" type="radio" name={task.title} id={task.id}/>
            <label className="form-check-label" for={task.id}>
              {task.title}
            </label>
        </div>
            {task.description && <div className='additional-text text-muted'>{task.description}</div>}
            {task.label || task.dueDate ? <div className='additional-text'>
                {task.dueDate && <span className='text-danger'> <BiCalendarAlt/> {task.dueDate}</span>}
                {task.label && <span className='text-warning'> <BiLabel/> {task.label}</span>}
            </div> : "" }
        </div>
           <div className="icons d-flex">
           <BiEditAlt style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BiCalendarEdit style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BiComment style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BsThreeDots style={hover ? {opacity: 1} : {opacity: 0}}/>   
       </div>       

    </div>

);
}
