import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import DraggableColumn from "./DraggableColumn";
import { AiFillFolderAdd } from "react-icons/ai";
import AddSection from "../../AddSection";
const dummyData = [
  {
    id: uuid(),
    content: "First Task",
  },
  {
    id: uuid(),
    content: "Second Task",
  },
];
const columnsData = {
  [uuid()]: {
    name: "To Do",
    items: dummyData,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destinationColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState(columnsData);
  const [editing, setEditing] = useState(false);
  const [section, setSection] = useState("");
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return <DraggableColumn id={id} column={column} />;
        })}
        {editing ? (
          <div>
            <AddSection
              title="addSection"
              section={section}
              setSection={setSection}
              setEditing={setEditing}
            />
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

export default Kanban;
