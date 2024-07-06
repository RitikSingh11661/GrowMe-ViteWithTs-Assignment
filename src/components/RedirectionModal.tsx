import React from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
interface RedirectionModalProps {
    open: boolean;
    handleYes: () => void;
    handleClose: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Responsive width
    maxWidth: 400, // Maximum width
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2, // Responsive padding
    '@media (min-width:600px)': {
      p: 4, // Increase padding on larger screens
    },
  };

const RedirectionModal: React.FC<RedirectionModalProps> = ({open,handleYes,handleClose}) => {
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    You have already created your account
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>Do you want to visit page2?</Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={handleYes}>Yes</Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>No</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default RedirectionModal;