import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { postSection } from "../../redux/actions/sectionActions";

const AddSection = ({ setSection, section, title, setEditing }) => {
  const [project, setProject] = useState({});
  const dispatch = useDispatch();
  const projectFromState = useSelector(
    (state) => state.projects.projectFromState
  );

  useEffect(() => {
    setProject(projectFromState);
  }, [projectFromState]);
  console.log(project);
  return (
    <div
      className={title === "addSection" ? "add-section" : "add-section mt-4"}
      style={{ width: "100%" }}
    >
      <TextField
        fullWidth
        id="add-section"
        label={title === "addSection" ? "Edit Section" : "Add Section"}
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
              dispatch(
                postSection({ title: section, projectId: project._id }, project)
              );
              setSection("");
            }}
            className="btn btn-secondary btn-sm"
          >
            {title === "addSection" ? "Edit Section" : "Add Section"}
          </button>
        ) : (
          <button className="btn btn-secondary btn-sm" disabled>
            {title === "addSection" ? "Edit Section" : "Add Section"}
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
