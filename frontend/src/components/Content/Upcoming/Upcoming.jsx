import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./upcoming.css";
import UpcomingDatePicker from "./UpcomingDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../redux/actions/taskActions";
import UpcomingDate from "./UpcomingDate";
const today = new Date();
const tomorrow = new Date(today);
const maxDate = new Date(tomorrow.setDate(tomorrow.getDate() + 730));
const Upcoming = () => {
  const [value, setValue] = React.useState([null, null]);
  const [dates, setDates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasks.list);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

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
          dates.slice(0, 30).map((date) => {
            return <UpcomingDate tasks={tasks} date={date} />;
          })}
      </ul>
    </div>
  );
};

export default Upcoming;
