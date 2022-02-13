import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import Modal from "@mui/material/Modal";
import AddTask from "../AddTask";
import { BsXCircle, BsCalendar2Event } from "react-icons/bs";
import { BiCalendarAlt } from "react-icons/bi";
import { handleCLose } from "../../../../redux/actions.js";
import SubPanel from "./SubPanel";
import "./modal.css";
import CustomDatePicker from "../../CustomDatePicker";
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

const CustomModal = () => {
  const { open, openTask } = useSelector((state) => state.modalState);
  const [edit, setEdit] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={open}
        onClose={() => dispatch(handleCLose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-header-icons">
            <div>
              <MailIcon style={{ color: "#325288" }} />
              <span>Inbox</span>
            </div>
            <BsXCircle onClick={() => dispatch(handleCLose())} />
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

              {!showCalendar ? (
                <div>
                  <CustomDatePicker
                    setShowCalendar={setShowCalendar}
                    showCalendar={showCalendar}
                    task={openTask}
                  />
                </div>
              ) : (
                <div>
                  {openTask.dueDate ? (
                    <label
                      htmlFor="date-picker"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <button
                        className="btn btn-sm btn-outline-danger"
                        style={{ borderColor: "#ccc" }}
                      >
                        <BiCalendarAlt /> {openTask.dueDate}
                      </button>
                    </label>
                  ) : (
                    <label
                      htmlFor="date-picker"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <button
                        className="btn btn-sm btn-light"
                        style={{ borderColor: "#ccc" }}
                      >
                        <BsCalendar2Event className="mr-1" /> Schedule
                      </button>
                    </label>
                  )}
                </div>
              )}
            </div>
          )}
          <SubPanel task={openTask} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
