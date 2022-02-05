import React, {useState} from 'react';

import { BsThreeDots  } from "react-icons/bs";
import { BiEditAlt, BiComment, BiCalendarAlt, BiLabel, BiCalendarEdit} from "react-icons/bi";
import "./task.css"
import { useDispatch } from 'react-redux';
import { handleOpen } from '../../../redux/actions';

export default function CheckTask({task}) {
    const [hover, setHover] = useState(false);

const dispatch = useDispatch()  

  return (
    <div className="d-flex justify-content-between py-2 wrapper" onMouseOut={() => setHover(false) }
    onMouseOver={() => setHover(true)} >
        <div className="text" >
            <div class="form-check" >
                <input className="form-check-input" type="radio" name={task.title} id={task.id}/>
                <label onClick={()=>dispatch(handleOpen(task))} className="form-check-label" for={task.id}>
                {task.title}
                </label>
            </div>
            
            {task.description && <div className='w-100 additional-text text-muted' onClick={()=>dispatch(handleOpen(task))}>{task.description.substring(0,110)}...</div>}
            {task.label || task.dueDate ? <div className='additional-text'>
                {task.dueDate && <span className='text-danger ' > <BiCalendarAlt /> {task.dueDate}</span>}
                {task.label && <span className='text-warning'> <BiLabel/> {task.label}</span>}
            </div> : "" }
            
        </div>
           <div className="icons d-flex">
           <BiEditAlt style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BiCalendarEdit style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BiComment onClick={()=>dispatch(handleOpen(task))} style={hover ? {opacity: 1} : {opacity: 0}}/>
           <BsThreeDots style={hover ? {opacity: 1} : {opacity: 0}}/>   
       </div>       

    </div>

);
}
