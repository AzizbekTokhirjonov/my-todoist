import React, { useState } from "react";
import CheckTask from "../Task/CheckTask";
import AddTask from "../Task/AddTask";
import AddTaskIcon from "../Task/AddTaskIcon";
import { format } from "date-fns";

const UpcomingDate = ({ tasks, date }) => {
  const [hover, setHover] = useState(false);
  const [addTask, setAddTask] = useState(false);
  return (
    <li className="mt-4" key={date}>
      <div className="date">{date}</div>

      {tasks.map((task) => {
        const createdOnThatDate =
          format(new Date(task.dueDate), "dd/MM/yyyy EEEE") === date;
        return (
          createdOnThatDate && (
            <div className="tasks-wrapper">
              <React.Fragment key={task._id}>
                <CheckTask task={task} />

                <hr />
              </React.Fragment>
            </div>
          )
        );
      })}
      {addTask ? (
        <AddTask setAddTask={setAddTask} />
      ) : (
        <AddTaskIcon
          setAddTask={setAddTask}
          setHover={setHover}
          hover={hover}
        />
      )}
    </li>
  );
};

export default UpcomingDate;
