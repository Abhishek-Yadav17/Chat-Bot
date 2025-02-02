import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Button, TextField, Typography, Container, Box, CircularProgress, Divider, Link } from '@mui/material';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';

function UserRegistration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
      if (response.status === 200) {
        setIsSubmitted(true);
        alert('Verification email sent!');
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-code', { email, code: verificationCode });
      if (response.data.success) {
        setIsVerified(true);
        navigate('/success');
      } else {
        alert('Invalid verification code!');
      }
    } catch (error) {
      console.error('Error during code verification', error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { email, name } = response.profileObj;
    setEmail(email);
    setName(name);
    alert('Google login successful');

    try {
      const responseFromAPI = await axios.post('http://localhost:5000/api/register', { name, email, password: '' });
      if (responseFromAPI.status === 200) {
        alert('Google account registered and logged in!');
        navigate('/success');
      }
    } catch (error) {
      console.error('Error during Google login registration', error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    if (error.error === "popup_closed_by_user") {
      console.log("User closed the popup before completing the login process.");
    } else {
      console.error("Google Login Error", error);
    }
  };

  return (
    <Container component="main" maxWidth={false} sx={{
      background: 'linear-gradient(to right bottom, #686279, #686279)',
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      overflow: 'hidden',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '40px 24px',
        borderRadius: 5,
        bgcolor: '#2C2638',
        width: '100%',
        height: 'auto',
        maxWidth: 450,
        boxSizing: 'border-box',
        boxShadow: 7
      }}>
        <Typography variant="h5" gutterBottom sx={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          mb: 2
        }}>
          Sign Up
        </Typography>

        <Typography variant="body2" align="center" sx={{
          color: '#757185',  // This color will match the rest of the form text
          marginBottom: 3,    // Add some space at the bottom
          }}>
          Already have an account?{' '}
          <Link href="/login" sx={{
            color: '#1E88E5',  // Blue color for the link
            textDecoration: 'none',  // Remove underline
            '&:hover': {
              textDecoration: 'underline',  // Underline on hover
            },
          }}>
            Get started
          </Link>
        </Typography>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <TextField
                variant="outlined"
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                      borderWidth: '0.1px'
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#9185B1',
                  },
                }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <TextField
                variant="outlined"
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{
                backgroundColor: '#6B52B0',
                color: '#fff',
                width: '100%',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '12px 22px',
                mt: 2
              }}>
                Register
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 1 }} // Adjust delay to match other animations
            >
              <Divider sx={{
                width: '50%',
                marginTop: 2, // Optional: adds space above the line
                borderColor: '#C6C9CB', // Line color (gray)
                borderWidth: '0.01',
                mx: 'auto'  // Thin line
              }} />
            </motion.div>
          </form>
        ) : !isVerified ? (
          <Box sx={{ marginTop: 2 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
              <Typography variant="body1">We've sent you an email with a verification code. Please check your email.</Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
              <form onSubmit={handleVerifyCode}>
                <TextField
                  variant="outlined"
                  label="Enter Verification Code"
                  fullWidth
                  margin="normal"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
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
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{
                backgroundColor: '#6B52B0',
                color: '#fff',
                width: '100%',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '12px 22px',
                mt: 2}}>
                  Verify Code
                </Button>
              </form>
            </motion.div>
          </Box>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }}>
            <Typography variant="body1" color="success.main">
              Account verified! Redirecting...
              <CircularProgress />
            </Typography>
          </motion.div>
        )}

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" align="center">
            Or sign up with Google:
          </Typography>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }}>
            <GoogleLogin
              clientId="694864864304-eckcjm64a8fe1rfjrhkgs0spqf6ufh03.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  sx={{
                    marginTop: 2,
                    backgroundColor: '#6B52B0', // Google red
                    color: '#fff',
                    borderRadius: '12px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    padding: '12px 22px',
                    '&:hover': {
                      backgroundColor: '#C1351D', // Darker Google red on hover
                    },
                  }}
                >
                  <GoogleIcon sx={{ mr: 1 }} />
                </Button>
              )}
            />
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}

export default UserRegistration;
