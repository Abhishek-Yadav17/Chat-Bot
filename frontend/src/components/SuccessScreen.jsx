import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion

function SuccessScreen() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const handleExploreAdminPanel = () => {
    navigate('/admin-panel');
  };

  const handleSetupOrganisation = () => {
    navigate('/setup-organisation');
  };

  const handleChatbotIntegration = () => {
    navigate('/chatbot-integration');
  };

  const handleStartChatbot = () => {
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  // Variants for the stagger effect
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#615B72', height: '94vh' }}>
      <h2>Registration Successful!</h2>

      {/* Flex container for cards */}
      <motion.div
        style={{
          display: 'flex', // Use flexbox for layout
          justifyContent: 'space-between',
          flexWrap: 'wrap', // Allow cards to wrap onto new lines if necessary
          gap: '20px', // Add space between the cards
          padding: '20px 0', // Some space at the bottom for chatbot
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }, // Stagger the animations of the children
          },
        }}
      >
        {/* Card for Explore Admin Panel */}
        <motion.div
          variants={cardVariants}
          style={{
            width: '23%', // Each card takes up 23% of the width
            height: '250px', // Set a specific height for this card
          }}
          whileHover={{ scale: 1.1 }} // Rotate slightly on hover
          transition={{ duration: 0.3 }} // Instant transition on hover
        >
          <Card sx={{ height: '100%', backgroundColor: 'rgb(51, 43, 66)', borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                Explore Admin Panel
              </Typography>
              <Typography variant="body2" color="rgb(221, 210, 210)" sx={{ mt: 3 }}>
                Access the admin panel to manage settings and configurations for your application.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleExploreAdminPanel} sx={{ marginTop: 5, backgroundColor: '#6D54B5' }}>
                Explore
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card for Setup Organization */}
        <motion.div
          variants={cardVariants}
          style={{ flex: '1 1 calc(25% - 20px)', minWidth: '250px' }}
          whileHover={{ scale: 1.1 }} // Rotate slightly on hover
          transition={{ duration: 0.3 }} // Instant transition on hover
        >
          <Card sx={{ height: '100%', backgroundColor: 'rgb(51, 43, 66)', borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                Setup Organization
              </Typography>
              <Typography variant="body2" color="rgb(221, 210, 210)" sx={{ mt: 3 }}>
                Set up and configure your organization with required details.
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleSetupOrganisation} sx={{ marginTop: 5, backgroundColor: '#6D54B5' }}>
                Setup
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card for Chatbot Integration */}
        <motion.div
          variants={cardVariants}
          style={{ flex: '1 1 calc(25% - 20px)', minWidth: '250px' }}
          whileHover={{ scale: 1.1 }} // Rotate slightly on hover
          transition={{ duration: 0.3 }} // Instant transition on hover
        >
          <Card sx={{ height: '100%', backgroundColor: 'rgb(51, 43, 66)', borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                Chatbot Integration
              </Typography>
              <Typography variant="body2" color="rgb(221, 210, 210)" sx={{ mt: 3 }}>
                Integrate a chatbot to assist with user interactions and support.
              </Typography>
              <Button variant="contained" color="success" onClick={handleChatbotIntegration} sx={{ marginTop: 5, backgroundColor: '#6D54B5' }}>
                Integrate
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card for Start Chatbot */}
        <motion.div
          variants={cardVariants}
          style={{ flex: '1 1 calc(25% - 20px)', minWidth: '250px' }}
          whileHover={{ scale: 1.1 }} // Rotate slightly on hover
          transition={{ duration: 0.3 }} // Instant transition on hover
        >
          <Card sx={{ height: '100%', backgroundColor: 'rgb(51, 43, 66)', borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                Start talking to your chatbot
              </Typography>
              <Typography variant="body2" color="rgb(221, 210, 210)" sx={{ mt: 3 }}>
                Start a conversation with your newly integrated chatbot.
              </Typography>
              <Button variant="contained" color="success" onClick={handleStartChatbot} sx={{ marginTop: 5, backgroundColor: '#6D54B5' }}>
                Start Chatting
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Chatbot at the right bottom */}
      {showChatbot && (
        <motion.div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '300px',
            height: '400px',  // Fixed height for the chatbot container
            backgroundColor: '#2C2736',  // Updated background color for chatbot container
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',  // Prevent overflow in the main container
          }}
          initial={{ opacity: 0, scale: 0.5 }}  // Start smaller and invisible
          animate={{ opacity: 1, scale: 1 }}    // Animate to full size and visible
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <h3 style={{ color: '#fff' }}>Chatbot</h3>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={handleCloseChatbot}
              style={{ padding: '2px 8px' }}
            >
              X
            </Button>
          </div>

          <div
            style={{
              flex: 1,  // Allow the messages section to take up available space
              overflowY: 'auto',  // Scroll if content exceeds the available height
              backgroundColor: 'rgb(68, 59, 87)',  // Dark background color for messages
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',  // Space for input box
              color: 'white',  // Make the text color white for the messages
              maxHeight: 'calc(100% - 40px)',  // Prevent message section from overflowing
            }}
          >
            <p><strong>Chatbot:</strong> How can I assist you today?</p>

            <input
              type="text"
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #9086B1',  // Input field border color
                fontSize: '1rem',
                marginTop: '10px',  // Space between the messages and input field
                boxSizing: 'border-box',
                color: 'white',  // Text color inside the input field
                backgroundColor: 'rgb(68, 59, 87)',  // Match input field background to the chat area
                caretColor: '#fff',
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SuccessScreen;
