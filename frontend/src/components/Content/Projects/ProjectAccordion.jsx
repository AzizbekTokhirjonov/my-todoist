import React, { useEffect, useState } from "react";
import TransitionsModal from "../TransitionModal";
import Select from "../FilterScreen/Select";
import { useDispatch } from "react-redux";
import "./style.css";
import {
  addProjectToState,
  getProjects,
  postProject,
  updateProject,
} from "../../../redux/actions/projectActions";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
const colors = ["blue", "green", "red", "pink", "yellow"];
const url = process.env.REACT_APP_DEV_URL;
const ProjectAccordion = ({
  projects,
  showProjects,
  setShowProjects,
  openProjectsModal,
  setOpenProjectsModal,
}) => {
  const [projectToUpdate, setProjectToUpdate] = useState({});
  const [editing, setEditing] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectColor, setProjectColor] = useState(colors[0]);
  const [projectAddToFavourites, setProjectAddToFavourites] = useState(false);
  const dispatch = useDispatch();
  const [letFormSubmit, setLetFormSubmit] = useState(false);
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (projectTitle && projectColor) {
      setLetFormSubmit(true);
    }
  }, [openProjectsModal, projectTitle, projectColor]);
  const projectObj = {
    name: projectTitle,
    color: projectColor,
    favorite: projectAddToFavourites,
    projectOwner: user._id,
  };
  const handleClose = () => setOpenProjectsModal(false);
  const handleSubmit = () => {
    if (editing) {
      dispatch(updateProject(projectToUpdate._id, projectObj));
      setProjectTitle("");
      setProjectToUpdate({});
      setEditing(false);
    } else {
      dispatch(postProject(projectObj));
    }

    handleClose();
  };
  const deleteProject = async (id) => {
    console.log(`${url}/tasks/${id}`);
    const response = await fetch(`${url}/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(getProjects());
    }
  };
  return (
    <div className="accordion-wrapper">
      <TransitionsModal
        closeModal={setOpenProjectsModal}
        openModal={openProjectsModal}
        title={editing ? "Update project" : "Add project"}
        action={handleSubmit}
        letAction={letFormSubmit}
        setEditing={setEditing}
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
              placeholder={editing ? "Update project title" : ""}
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
          projects &&
          projects.map((project) => (
            <Link key={project._id} to={`/projects/kanban/${project._id}`}>
              <li onClick={() => dispatch(addProjectToState(project))}>
                <div className="d-flex justify-content-between additional-text">
                  <div style={{ fontSize: "13px" }}>
                    <BiRadioCircleMarked style={{ color: project.color }} />
                    {project.name}
                  </div>
                  <div className="d-flex">
                    <div className="hoverable-icons">
                      <MdOutlineFavoriteBorder />
                    </div>
                    <div
                      onClick={() => {
                        setEditing(true);
                        console.log(editing);
                        setProjectToUpdate(project);
                        console.log(projectToUpdate);
                        setOpenProjectsModal(true);
                      }}
                      className="hoverable-icons"
                    >
                      <AiFillEdit />
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProject(project._id);
                      }}
                      className="hoverable-icons "
                    >
                      <RiDeleteBin6Line />
                    </div>
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
