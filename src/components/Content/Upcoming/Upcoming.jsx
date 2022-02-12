import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import "./upcoming.css";
import tasks from "../../../Dummy-data/tasks";
import CheckTask from "../Task/CheckTask";
import AddTask from "../Task/AddTask";
import AddTaskIcon from "../Task/AddTaskIcon";
import UpcomingDatePicker from "./UpcomingDatePicker";
const today = new Date();
const tomorrow = new Date(today);
const days = [];
const maxDate = new Date(tomorrow.setDate(tomorrow.getDate() + 730));
const Upcoming = () => {
  const [hover, setHover] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [value, setValue] = useState(today);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const start = new Date(format(today, "dd/MM/yyyy"));
    const end = new Date(format(maxDate, "dd/MM/yyyy"));

    const daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const arr = [];

    for (let i = 0; i <= daysBetween; i++) {
      const temp = new Date();
      temp.setDate(today.getDate() + i);
      arr.push(format(temp, "dd/MM/yyyy EEEE"));
    }

    setDates(arr);
  }, []);

  const refs = dates.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    console.log(value);
    return acc;
  }, {});

  const handleScroll = (id) =>
    refs[id].current.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div id="upcoming" className="mx-auto">
      <div className="date-header">
        <UpcomingDatePicker
          value={value}
          setValue={setValue}
          minDate={today}
          maxDate={maxDate}
          handleScroll={handleScroll}
          format={format}
        />
      </div>
      <ul>
        {dates.length > 1 &&
          dates.map((date) => (
            <li
              id={format(value, "dd/MM/yyyy")}
              ref={refs[date.id]}
              className="mt-4"
              key={date}
            >
              <div className="date">{date}</div>
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Upcoming;
