import { useState } from 'react';
import { Button, Container, Typography, Modal, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';  // Import framer-motion
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

function ChatbotIntegration() {
  const [isTested, setIsTested] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [developerEmail, setDeveloperEmail] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);  // State for showing email input
  const navigate = useNavigate();

  const integrationCode = `
    <script>
      // Dummy integration code for chatbot
      const chatbot = document.createElement('div');
      chatbot.innerHTML = '<div>Your chatbot is live! How can I help you?</div>';
      document.body.appendChild(chatbot);
    </script>
  `;

  const handleTestChatbot = () => setShowChatbot(true);
  const handleTestIntegration = () => {
    setIsTested(true);
    setIsSuccess(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
  };

  const handleIntegrationInstructions = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleExploreAdminPanel = () => {
    // Navigate to Admin Panel or Dashboard
    navigate('/admin-panel');
  };

  const handleStartChatbot = () => {
    // Display the chatbot widget
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  // New function to handle sending instructions via email
  const handleSendInstructions = async () => {
    if (!developerEmail) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ developerEmail, integrationCode })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Integration instructions have been sent to ' + developerEmail);
      } else {
        alert('Error sending instructions');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending instructions');
    }

    setShowModal(false);
    setDeveloperEmail(''); // Reset the email field
  };

  return (
    <Container sx={{ padding: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
      >
        <Typography variant="h4">Chatbot Integration</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.2 }}
      >
        <Button onClick={handleTestChatbot} variant="contained" color="primary" sx={{ 
                marginTop: 3, 
                backgroundColor: '#6B52B0',
                color: '#fff',
                textTransform: 'capitalize',
                borderRadius: '12px',
                padding: '12px 22px',
                mr: 2 }}>
          Test Chatbot
        </Button>
        <Button
          onClick={handleShowEmailInput} // Show email input field when clicked
          variant="contained"
          color="secondary"
          sx={{ marginTop: 3, 
            backgroundColor: '#6B52B0',
            color: '#fff',
            textTransform: 'capitalize',
            borderRadius: '12px',
            padding: '12px 22px',
            mr: 2 }}
        >
          Integrate on Website
        </Button>
        <Button onClick={handleTestIntegration} variant="contained" color="success" sx={{ marginTop: 3, 
                backgroundColor: '#6B52B0',
                color: '#fff',
                textTransform: 'capitalize',
                borderRadius: '12px',
                padding: '12px 22px',
                mr: 2 }}>
          Test Integration
        </Button>
      </motion.div>

      {showEmailInput && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '20px' }}
        >
          <TextField
      variant="outlined"
      label="Developer's Email"
      fullWidth
      margin="normal"
      value={developerEmail}
      onChange={(e) => setDeveloperEmail(e.target.value)}
      sx={{
        mb: 2,
        input: { color: '#F3EFF4', fontSize: '0.875rem' },
        label: { color: '#757185', fontSize: '0.875rem' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '12px',
            borderColor: '#C6C9CB',
            borderWidth: '0.5px'
          },
          '&:hover fieldset': {
            borderColor: '#C6C9CB',
            borderWidth: '0.5px'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#9185B1',
            borderWidth: '0.5px'
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#9185B1',
        },
      }}
    />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendInstructions} // Trigger the email sending logic
            sx={{ marginTop: 2,
              backgroundColor: '#6B52B0',
                color: '#fff',
                textTransform: 'capitalize',
                borderRadius: '12px',
                padding: '12px 22px',
                mr: 2
             }}
          >
            Send Instructions
          </Button>
        </motion.div>
      )}

      {isTested && isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {showConfetti && <Confetti />}
          <Typography variant="h5" sx={{mt: 7}}>Integration Successful!</Typography>
          <Typography variant="body1">Your chatbot has been successfully integrated.</Typography>

          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleExploreAdminPanel} sx={{
            backgroundColor: '#6B52B0',
            color: '#fff',
            textTransform: 'capitalize',
            borderRadius: '12px',
            padding: '12px 22px',
            mr: 2 }}>
              Explore Admin Panel
            </Button>
            <Button variant="contained" color="secondary" onClick={handleStartChatbot} sx={{ 
            backgroundColor: '#6B52B0',
            color: '#fff',
            textTransform: 'capitalize',
            borderRadius: '12px',
            padding: '12px 22px',
            mr: 2}}>
              Start talking to your chatbot
            </Button>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Share your success!
            </Typography>
            <FacebookShareButton url="https://yourwebsite.com" quote="I just integrated a chatbot!" hashtag="#chatbot" style={{ marginRight: '10px' }}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url="https://yourwebsite.com" title="I just integrated a chatbot!" hashtags={['chatbot']} style={{ marginRight: '10px' }}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url="https://yourwebsite.com" style={{ marginRight: '10px' }}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Box>
        </motion.div>
      )}

      {isTested && !isSuccess && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" color="error">
            Integration Failed
          </Typography>
          <Typography variant="body1">
            We couldn't detect the integration on your website. Please try again.
          </Typography>
        </motion.div>
      )}

      <Modal open={showModal} onClose={handleCloseModal}>
        <motion.div
          style={{ padding: '20px', backgroundColor: 'white', margin: '20px', borderRadius: '8px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6">Integration Instructions</Typography>
          <pre>{integrationCode}</pre>
          <TextField label="Developer's Email" value={developerEmail} onChange={(e) => setDeveloperEmail(e.target.value)} fullWidth margin="normal" />
        </motion.div>
      </Modal>

      {/* Chatbot UI */}
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
    </Container>
  );
}

export default ChatbotIntegration;
