import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import AddTask from './AddTask';
import { BiEnvelope } from "react-icons/bi";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "65vh",
    height: "90vh",
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

const CustomModal = ({category}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div> 
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <div>
                <BiEnvelope/> Inbox
            </div>
            <div>
                <AddTask editing={true} title='Do something' description='Finish the project'/>
            </div>
            <div>
            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" centered>
                <Tab label="Sub-tasks" />
                <Tab label="Comments"/>
                <Tab label="Activity" />
            </Tabs>
            </div>
        </Box>
        </Modal>
    </div>
  )
}

export default CustomModal;
