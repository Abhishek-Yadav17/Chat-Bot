import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import framer-motion

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate('/');

  return (
    <Container sx={{ padding: 2, maxWidth: 800 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{mt: 5}}>Admin Panel</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="body1" sx={{mt: 3}}>Welcome to the Admin Panel. Here you can manage your chatbot settings.</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="h6" sx={{mt: 3}}>Settings</Typography>
        <Typography variant="body2">Configure your chatbot settings like training, integrations, etc.</Typography>
      </motion.div>

      <Button onClick={handleGoBack} variant="contained" color="primary" sx={{ 
        mt: 3,
        backgroundColor: '#6B52B0',
                color: '#fff',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '12px 22px'
                }}>
        Back to Success Page
      </Button>
    </Container>
  );
};

export default AdminPanel;
