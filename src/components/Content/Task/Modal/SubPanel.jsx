import React, { useState } from "react";
import AddTaskIcon from "../AddTaskIcon";
import AddTask from "../AddTask";
import { Nav } from "react-bootstrap";
import "./modal.css";
const SubPanel = () => {
  const [addSubTask, setSubAddTask] = useState(false);
  const [hover, setHover] = useState(false);
  const [openTab, setOpenTab] = useState("sub-tasks");
  return (
    <div className="mt-4">
      <div className="tabs">
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link onClick={() => setOpenTab("sub-tasks")}>
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
        <div>
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
        <div className="comments">Comments</div>
      ) : (
        <div className="activity">activity</div>
      )}
    </div>
  );
};

export default SubPanel;
