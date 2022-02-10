import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { BiCalendarAlt } from "react-icons/bi";

export default function CustomDatePicker({
  showCalendar,
  setShowCalendar,
  task,
}) {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} className="mt-4">
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              id="date-picker"
              style={showCalendar ? { display: "none" } : { display: "block" }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
