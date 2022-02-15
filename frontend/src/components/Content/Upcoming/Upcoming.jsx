import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./upcoming.css";
import tasks from "../../../Dummy-data/tasks";
import CheckTask from "../Task/CheckTask";
import AddTask from "../Task/AddTask";
import AddTaskIcon from "../Task/AddTaskIcon";
import UpcomingDatePicker from "./UpcomingDatePicker";
const today = new Date();
const tomorrow = new Date(today);
const maxDate = new Date(tomorrow.setDate(tomorrow.getDate() + 730));
const Upcoming = () => {
  const [hover, setHover] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [value, setValue] = React.useState([null, null]);
  const [dates, setDates] = useState([]);

  const showDaysBetween = (start, end) => {
    const daysBetween = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const arr = [];

    for (let i = 0; i <= daysBetween; i++) {
      const temp = new Date(start);
      arr.push(format(temp.setDate(start.getDate() + i), "dd/MM/yyyy EEEE"));
    }

    setDates(arr);
    console.log(format(start, "dd/MM/yyyy"));
  };

  useEffect(() => {
    showDaysBetween(today, maxDate);
  }, []);

  useEffect(() => {
    if (value[0] !== null && value[1] !== null) {
      const start = new Date(value[0]);
      const end = new Date(value[1]);
      showDaysBetween(start, end);
    }
  }, [value]);

  return (
    <div id="upcoming" className="mx-auto">
      <div className="mb-4">
        <small className="text-muted mb-4">
          See upcoming tasks within 30 days or select the date range
          yourself.....
        </small>
      </div>
      <div className="date-header">
        <UpcomingDatePicker
          value={value}
          setValue={setValue}
          minDate={today}
          maxDate={maxDate}
        />
      </div>
      <ul>
        {dates.length > 1 &&
          dates.slice(0, 30).map((date) => (
            <li
              // id={format(value, "dd/MM/yyyy")}
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
