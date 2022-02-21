import React from "react";
import { postSection } from "../../redux/actions/taskActions";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";

const AddSection = ({ setSection, section, title, setEditing }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={title === "addSection" ? "add-section" : "add-section mt-4"}
      style={{ width: "100%" }}
    >
      <TextField
        fullWidth
        id="add-section"
        label="Add Section"
        type="text"
        variant="standard"
        value={section}
        onChange={(e) => {
          setSection(e.target.value);
        }}
        tabIndex="0"
      />
      <div className="d-flex mt-2">
        {section.length > 1 ? (
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(postSection({ title: section }));
            }}
            className="btn btn-secondary btn-sm"
          >
            Add Section
          </button>
        ) : (
          <button className="btn btn-secondary btn-sm" disabled>
            Add Section
          </button>
        )}
        <div onClick={() => setEditing(false)} className="btn btn-sm">
          Cancel
        </div>
      </div>
    </div>
  );
};

export default AddSection;
