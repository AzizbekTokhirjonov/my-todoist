import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen } from "../../redux/actions/actions";
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          backgroundColor: "#e7e3e3",
          color: "black",
        },
        inputRoot: {
          backgroundColor: "#e7e3e3",
          borderColor: "black",
          color: "black",

          '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type':
            {
              // Default left padding is 6px
              color: "black",
              paddingLeft: 26,
            },
          "& #asynchronous-demo-label": {
            // Default left padding is 6px
            backgroundColor: "black",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e7e3e3",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e7e3e3",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c9c9c",
          },
        },
        label: {
          color: "white",
        },
        inputFocused: {
          color: "white",
        },
      },
    },
  },
});
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Asynchronous = () => {
  const taskList = useSelector((state) => state.tasks.list);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchedTask, setSearchedTask] = React.useState({});
  const loading = open && options.length === 0;
  const dispatch = useDispatch();
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...taskList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const handleChange = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        autoComplete={true}
        clearOnEscape={true}
        popupIcon={null}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        onChange={(e, value) => {
          if (value) {
            dispatch(handleOpen(value));
          }
        }}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={`🔍    Search task`}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default Asynchronous;
