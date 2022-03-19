import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../../redux/actions/taskActions.js";
import AddTask from "../../Task/AddTask.jsx";
import {
  deleteSectionTask,
  getSections,
} from "../../../../redux/actions/sectionActions.js";
const url = process.env.REACT_APP_DEV_URL;

const DraggableItem = ({ item, index, id, project }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const projectFromState = useSelector(
    (state) => state.projects.projectFromState
  );
  const deleteTask = async (id, project) => {
    console.log(`${url}/tasks/${id}`);
    const response = await fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      dispatch(getSections(project._id));
    }
  };
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              userSelect: "none",
              ...provided.draggableProps.style,
            }}
          >
            <Paper
              style={{
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging ? "#eeeeee" : "#fff",
                color: "#000",
              }}
              elevation={12}
              className="d-flex justify-content-between"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={item.title}
                  id={id}
                />
                <label className="form-check-label" htmlFor={id}>
                  {item.title}
                </label>
              </div>
              <div className="hoverable-icons d-flex  my-auto">
                <div>
                  <BiEditAlt size={20} onClick={() => setEdit(true)} />
                </div>
                <div>
                  <MdDeleteOutline
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteSectionTask(projectFromState._id);
                      deleteTask(item._id, projectFromState);
                    }}
                  />
                </div>
              </div>
            </Paper>
            {edit && (
              <AddTask
                task={item}
                setEdit={setEdit}
                project={project}
                title="checkTask"
              />
            )}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default DraggableItem;
