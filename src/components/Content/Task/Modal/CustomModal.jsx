import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import AddTask from "../AddTask";
import { BiEnvelope } from "react-icons/bi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { handleCLose } from "../../../../redux/actions.js";
import SubPanel from "./SubPanel";
import CheckTask from "../CheckTask";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65vh",
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({}) => {
  const { open, openTask } = useSelector((state) => state.modalState);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          dispatch(handleCLose());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <BiEnvelope /> Inbox
          </div>

          {edit ? (
            <AddTask task={openTask} title="customModal" setEdit={setEdit} />
          ) : (
            <div>
              <div onClick={() => setEdit(true)}>
                <h4 className="font-weight-bold">{openTask.title}</h4>
                <p className="additional-text text-muted">
                  {openTask.description}
                </p>
              </div>
              <div>{openTask.dueDate}</div>
            </div>
          )}
          <SubPanel task={openTask} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
