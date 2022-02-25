import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addProjectToState,
  getProjects,
} from "../../redux/actions/projectActions";
const url = process.env.REACT_APP_DEV_URL;

const AddSection = ({ setSection, section, title, setEditing, project }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postSection = async (sectionObj, project) => {
    const section = sectionObj;
    try {
      const response = await fetch(`${url}/projects/${project._id}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(section),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addProjectToState(project));
        console.log("history: ", history);
        history.push(`/projects/kanban/${project._id}`);
        console.log("check me:", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(project);
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
              postSection({ title: section }, project);
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
