import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import DraggableColumn from "./DraggableColumn";
import { AiFillFolderAdd } from "react-icons/ai";
import AddSection from "../../AddSection";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSectionTask,
  postSectionTaskKanban,
} from "../../../../redux/actions/sectionActions.js";
const url = process.env.REACT_APP_DEV_URL;

// const dummyData = [
//   {
//     id: uuid(),
//     content: "First Task",
//   },
//   {
//     id: uuid(),
//     content: "Second Task",
//   },
// ];
// let columnsData = {
//   // [uuid()]: {
//   //   name: "To Do",
//   //   items: dummyData,
//   // },
//   // [uuid()]: {
//   //   name: "In Progress",
//   //   items: [],
//   // },
//   // [uuid()]: {
//   //   name: "Done",
//   //   items: [],
//   // },
// };

const Kanban = () => {
  const [columns, setColumns] = useState({});
  const [editing, setEditing] = useState(false);
  const [project, setProject] = useState(null);
  const [section, setSection] = useState("");

  const dispatch = useDispatch();
  const projectFromState = useSelector(
    (state) => state.projects.projectFromState
  );
  const sectionsFromState = useSelector((state) => state.sections.list);
  console.log(sectionsFromState);
  useEffect(() => {
    setProject(projectFromState);
    setColumns(sectionsFromState);
  }, [projectFromState, sectionsFromState]);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      console.log("source:", sourceColumn);
      console.log("dest:", destinationColumn);

      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destinationColumn.tasks];
      dispatch(
        postSectionTaskKanban(
          destinationColumn._id,
          sourceItems[source.index]._id,
          project
        )
      );
      dispatch(
        deleteSectionTask(
          sourceColumn._id,
          sourceItems[source.index]._id,
          project
        )
      );
      const [removed] = sourceItems.splice(source.index, 1);
      console.log("check me:", sourceItems[source.index]._id);

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      {project && <h4>{project.name}</h4>}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns &&
          Object.entries(columns).map(([id, column]) => {
            console.log("column:", column);
            console.log("id:", id);

            return <DraggableColumn id={id} column={column} />;
          })}
        {editing ? (
          <div>
            {project && (
              <AddSection
                title="addSection"
                project={project}
                section={section}
                setSection={setSection}
                setEditing={setEditing}
              />
            )}
          </div>
        ) : (
          <div
            onClick={() => setEditing(true)}
            className="btn btn-light  mt-3"
            style={{ height: "40px" }}
          >
            <span className="my-auto">
              <AiFillFolderAdd size={25} />
            </span>
            Add Section
          </div>
        )}
      </DragDropContext>
    </div>
  );
};

export default withRouter(Kanban);
