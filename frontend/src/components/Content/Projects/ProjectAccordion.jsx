import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
import TransitionsModal from "../TransitionModal";
import Select from "../FilterScreen/Select";
import { useDispatch } from "react-redux";
import "./style.css";
import { postProject } from "../../../redux/actions/projectActions";
import { Link } from "react-router-dom";
const colors = ["blue", "green", "red", "pink", "yellow"];

const ProjectAccordion = ({
  projects,
  showProjects,
  setShowProjects,
  openProjectsModal,
  setOpenProjectsModal,
}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectColor, setProjectColor] = useState(colors[0]);
  const [projectAddToFavourites, setProjectAddToFavourites] = useState(false);
  const dispatch = useDispatch();
  const [letFormSubmit, setLetFormSubmit] = useState(false)

  useEffect(() => {
    if(projectTitle && projectColor){
      setLetFormSubmit(true)
    }
  }, [openProjectsModal, projectTitle, projectColor]);
  const projectObj = {
    name: projectTitle,
    color: projectColor,
    favorite: projectAddToFavourites,
  };

  const handleSubmit = () => {
    dispatch(postProject(projectObj));
  }
  return (
    <div className="accordion-wrapper">
      <TransitionsModal
        closeModal={setOpenProjectsModal}
        openModal={openProjectsModal}
        title="Add project"
        action={handleSubmit}
        letAction={letFormSubmit}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="projectTitle" className="form-label">
              Project name
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <span>Project color</span>
          <Select
            setValue={setProjectColor}
            defaultValue={projectColor}
            options={colors}
            required
          />
          <div
            className="form-check form-switch"
            style={{ paddingTop: "10px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="projectAddFavourite"
              checked={projectAddToFavourites}
              onChange={() => setProjectAddToFavourites((prev) => !prev)}
            />
            <label className="form-check-label" htmlFor="projectAddFavourite">
              Add to favourites
            </label>
          </div>
        </form>
      </TransitionsModal>

      <ul className="ml-5 w-100 drawbar-projects">
        {showProjects &&
          projects.map((project) => (
            <Link key={project.title} to="/projects/kanban">
              <li>
                <div className="d-flex justify-content-between additional-text">
                  <div style={{ fontSize: "13px" }}>
                    <BiRadioCircleMarked style={{ color: project.color }} />
                    {project.title}
                  </div>
                  <div className="hoverable-icons ml-3">
                    <BsThreeDots />
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default ProjectAccordion;
