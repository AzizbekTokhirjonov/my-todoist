import React, { useState } from "react";
import AddTaskIcon from "../AddTaskIcon";
import AddTask from "../AddTask";
import { Nav } from "react-bootstrap";
import Comments from "./Comments/Comments";
import "./modal.css";
import SubTask from "../SubTask";

const SubPanel = ({ task }) => {
  const [addSubTask, setSubAddTask] = useState(false);
  const [hover, setHover] = useState(false);
  const [openTab, setOpenTab] = useState("sub-tasks");

  const { subTasks } = task;

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
          {subTasks.map((subTask) => (
            <div key={subTask.id}>
              <SubTask subTask={subTask} />
              <hr />
            </div>
          ))}
          {addSubTask ? (
            <AddTask setAddTask={setSubAddTask} title="subPanel" />
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
          <Comments />
        </div>
      ) : (
        <div className="activity panel-items">activity</div>
      )}
    </div>
  );
};

export default SubPanel;
