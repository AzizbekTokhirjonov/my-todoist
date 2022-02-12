import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { BiCalendarAlt } from "react-icons/bi";

export default function CustomDatePicker({
  setShowCalendar,
  showCalendar,
  task,
}) {
  const today = new Date();
  const tomorrow = new Date(today);
  const thisWeekend = new Date("Sat Feb 05 2022 9:50 AM");
  const nextWeek = new Date(today);
  const [value, setValue] = useState(today);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  function getSaturdayDate() {
    return new Date(new Date().getTime() - 120 * 60 * 60 * 1000);
  }

  useState(() => {
    console.log(value);
  }, [value]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} className="mt-4">
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <div>
              <ul className="date-btns">
                <li
                  className="btn"
                  onClick={() => {
                    setValue(today);
                    setShowCalendar(true);
                  }}
                >
                  Today
                </li>
                <li
                  className="btn"
                  onClick={() => {
                    setValue(tomorrow.setDate(tomorrow.getDate() + 1));
                    setShowCalendar(true);
                  }}
                >
                  Tomorrow
                </li>
                <li
                  className="btn"
                  onClick={() => {
                    setValue(tomorrow.setDate(thisWeekend.getDate() + 7));
                    setShowCalendar(true);
                  }}
                >
                  This Weekend
                </li>
                <li
                  className="btn"
                  onClick={() => {
                    setValue(nextWeek.setDate(tomorrow.getDate() + 7));
                    setShowCalendar(true);
                  }}
                >
                  Next Week
                </li>
              </ul>
              <TextField
                {...params}
                id="date-picker"
                style={
                  showCalendar ? { display: "none" } : { display: "block" }
                }
              />
              <div className="d-flex mt-2">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="btn btn-dark btn-sm mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="btn btn-sm btn-light "
                  style={{ borderColor: "#ccc" }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
