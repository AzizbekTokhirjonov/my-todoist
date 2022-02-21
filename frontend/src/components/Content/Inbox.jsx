import React, { useState, useEffect } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsThreeDots, BsSliders } from "react-icons/bs";
import AddTask from "./Task/AddTask";
import CheckTask from "./Task/CheckTask";
import "./Task/task.css";
import CustomModal from "./Task/Modal/CustomModal";
import AddTaskIcon from "./Task/AddTaskIcon";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, postSection } from "../../redux/actions/taskActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddSection from "./AddSection";

const Inbox = () => {
  const taskList = useSelector((state) => state.tasks.list);
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState(taskList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const sections = [];

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };
  return (
    <div id="inbox" className="mx-auto">
      <CustomModal />
      <div className="d-flex justify-content-between">
        <div className="title">
          <h4>Inbox</h4>
        </div>
        <div className="items">
          <ul className="d-flex">
            <li>
              <BsSliders />
              <span> Views</span>
            </li>
            <li>
              <BsThreeDots />
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
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
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
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {addTask ? (
        <AddTask setAddTask={setAddTask} />
      ) : (
        <AddTaskIcon
          setAddTask={setAddTask}
          setHover={setHover}
          hover={hover}
        />
      )}

      <AddSection section={section} setSection={setSection} />
    </div>
  );
};

export default Inbox;
