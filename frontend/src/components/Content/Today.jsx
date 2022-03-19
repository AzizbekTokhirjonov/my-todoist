import React, { useEffect, useState } from "react";
import { BsSliders, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CheckTask from "./Task/CheckTask";
import { useSelector } from "react-redux";
import AddTask from "./Task/AddTask";
import format from "date-fns/format";
const Today = () => {
  const taskList = useSelector((state) => state.tasks.list);
  const [hover, setHover] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState(taskList);
  const today = new Date();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };
  useEffect(() => {
    const filteredTasks = taskList.filter((task) => {
      return (
        format(new Date(task.dueDate), "dd/MM/yyyy") ===
        format(today, "dd/MM/yyyy")
      );
    });
    setTasks(filteredTasks);
  }, [taskList]);
  return (
    <div id="inbox" className="mx-auto">
      <div className="d-flex justify-content-between">
        <div className="title">
          <h4>Today</h4>
        </div>
        <div className="items">
          <ul className="d-flex">
            <li>
              <BsSliders />
              <span> Views</span>
            </li>
          </ul>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              className="tasks-wrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CheckTask task={task} />
                        <hr />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {addTask ? (
        <AddTask setAddTask={setAddTask} title="today" />
      ) : (
        <div
          className="add-task mt-4"
          onMouseOut={() => setHover(false)}
          onMouseOver={() => setHover(true)}
          onClick={() => setAddTask(true)}
        >
          {hover ? (
            <BsFillPlusCircleFill className="my-auto" size={20} />
          ) : (
            <AiOutlinePlus className="my-auto" size={20} />
          )}
          <span> Add task</span>
        </div>
      )}
    </div>
  );
};

export default Today;
