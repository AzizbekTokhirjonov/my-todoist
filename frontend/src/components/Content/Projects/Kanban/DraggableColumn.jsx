import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import AddTask from "../../Task/AddTask";
import AddTaskIcon from "../../Task/AddTaskIcon";
const DraggableColumn = ({ column, id }) => {
  const [addTask, setAddTask] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      key={id}
    >
      <h5>{column.name}</h5>
      <div className="m-2">
        <Droppable droppableId={id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#eeeeee" : "#fff",
                  padding: 4,
                  width: 250,
                  minHeight: 50,
                }}
              >
                {column.items.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <DraggableItem item={item} index={index} id={id} />
                    </div>
                  );
                })}
                {provided.placeholder}
                {addTask ? (
                  <AddTask setAddTask={setAddTask} />
                ) : (
                  <AddTaskIcon
                    setAddTask={setAddTask}
                    setHover={setHover}
                    hover={hover}
                  />
                )}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default DraggableColumn;
