import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function UpcomingDatePicker({
  value,
  setValue,
  maxDate,
  minDate,
  handleScroll,
  format,
  inputRef,
  // executeScroll,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Pick a date"
        value={value}
        maxDate={maxDate}
        minDate={minDate}
        onChange={(newValue) => {
          setValue(newValue);
          // handleScroll(format(newValue, "dd/MM/yyyy EEEE"));
          handleScroll(`myrefList ${8}`);
        }}
        renderInput={(params) => <TextField {...params} ref={inputRef} />}
      />
    </LocalizationProvider>
  );
}
