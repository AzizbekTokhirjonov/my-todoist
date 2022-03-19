import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vh",
  height: "60vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

export default function TransitionsModal({
  children,
  openModal,
  closeModal,
  title,
  action,
  letAction,
  setEditing,
}) {
  const [open, setOpen] = useState(openModal);
  const [disable, setDisable] = useState(!letAction);
  const handleClose = () => {
    if (title === "Update project") {
      setEditing(false);
      closeModal(false);
    } else {
      closeModal(false);
    }
  };

  useEffect(() => {
    setOpen(openModal);
    setDisable(!letAction);
  }, [openModal, letAction]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="transitionsmodal-header">
              <span>{title}</span>
              <Tooltip
                title="Click to explore this functionality"
                placement="right-start"
              >
                <span>
                  <BsQuestionCircle />
                </span>
              </Tooltip>
            </div>

            <div className="container transitionsmodal-body">{children}</div>

            <div className="transitionsmodal-footer">
              <button
                style={{ borderColor: "#ccc" }}
                type="button"
                className="btn btn-light"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={action}
                disabled={disable}
              >
                Add
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
