import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
const AddTaskIcon = ({ setAddTask, setHover, hover, title }) => {
  // const [hover, setHover] = useState(false);

  return (
    <div
      className="add-task mt-4"
      onMouseOut={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      onClick={() => setAddTask(true)}
    >
      {hover ? (
        <BsFillPlusCircleFill className="my-auto" size={20} />
      ) : (
        <AiOutlinePlus className="my-auto" size={20} />
      )}
      <span>{title === "subPanel" ? " Add sub-task" : " Add task"}</span>
    </div>
  );
};

export default AddTaskIcon;
