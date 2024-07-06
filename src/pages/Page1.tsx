import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, TextField, Typography, Box } from '@mui/material';
import RedirectionModal from '../components/RedirectionModal';;

const Page1: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleYes = () => {
    setModalOpen(false);
    navigate('/page2');
  };

  const handleClose = () => {
    setModalOpen(false);
};

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && phone && email) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/page2');
    } else alert('Please fill in all fields');
  };

  useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (userDetails)setModalOpen(true);
}, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '90%', // Responsive width
        maxWidth: 400, // Maximum width
        margin: 'auto',
        mt: 8, // Adjusted margin top for smaller screens
        '@media (min-width:600px)': {
          mt: 15, // Margin top for larger screens
        },
      }}
    >
      <Typography variant="h5" component="h2"> User Details</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <Button variant="contained" type="submit"> Submit</Button>
      <RedirectionModal open={modalOpen} handleYes={handleYes} handleClose={handleClose} />
    </Box>
  );
};

export default Page1;