import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import DraggableColumn from "./DraggableColumn";
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

  return (
    <div
      className="mx-auto"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: 100,
        margin: "auto 0",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return <DraggableColumn id={id} column={column} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
