import React, { useEffect, useState } from "react";
import AddTaskIcon from "../AddTaskIcon";
import AddTask from "../AddTask";
import { Nav } from "react-bootstrap";
import Comments from "./Comments/Comments";
import "./modal.css";
import SubTask from "../SubTask";
import { useSelector, useDispatch } from "react-redux";
import { getSubTasks } from "../../../../redux/actions/taskActions";
import Loader from "../../../Loader";


const SubPanel = ({ task }) => {
  const [addSubTask, setSubAddTask] = useState(false);
  const [hover, setHover] = useState(false);
  const [openTab, setOpenTab] = useState("sub-tasks");

  const {subtasks, fetchSubtasks, createSubtask, updateSubtask, deleteSubtask} = useSelector(state => state.subtasksOps)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSubTasks(task._id))
  },[dispatch, task])

  return (
    <div className="mt-4">
      <div className="tabs">
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link onClick={() => setOpenTab("sub-tasks")} eventKey="link-0">
              Sub-tasks
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setOpenTab("comments")} eventKey="link-1">
              Comments
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={() => setOpenTab("activity")}>
              Activity
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      {openTab === "sub-tasks" ? (
        <div className="sub-tasks panel-items">
          { fetchSubtasks.loading || createSubtask.loading || updateSubtask.loading || deleteSubtask.loading ? <Loader/> : subtasks &&
            subtasks.map((subTask) => (
              <div key={subTask._id}>
                <SubTask subTask={subTask} />
                <hr />
              </div>
            ))}
          {addSubTask ? (
            <AddTask setAddTask={setSubAddTask} title="subPanel" parentTaskId={task._id}/>
          ) : (
            <AddTaskIcon
              title="subPanel"
              setAddTask={setSubAddTask}
              setHover={setHover}
              hover={hover}
            />
          )}
        </div>
      ) : openTab === "comments" ? (
        <div className="comments panel-items">
          <Comments taskId={task._id} />
        </div>
      ) : (
        <div className="activity panel-items">activity</div>
      )}
    </div>
  );
};

export default SubPanel;
