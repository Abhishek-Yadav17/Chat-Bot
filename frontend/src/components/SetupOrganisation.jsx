import { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SetupOrganisation() {
  const [companyName, setCompanyName] = useState('');
  const [companyURL, setCompanyURL] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false); // Controls the "waiting" state
  const [selectedPageDataChunks, setSelectedPageDataChunks] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isScrapingComplete, setIsScrapingComplete] = useState(false);
  const [isScraping, setIsScraping] = useState(false); // New state for scraping process
  const navigate = useNavigate();

  const handleFetchData = async () => {
    try {
      setIsScraping(true); // Start scraping
      setIsWaiting(true); // Show "scraping" message

      // Fetch actual website data from the backend
      const response = await axios.get(`http://localhost:5000/api/fetch-meta?url=${companyURL}`);
      
      setDescription(response.data.description); // Set description from metadata
      setPages(response.data.pages); // Set pages data
      setIsFetched(true);
      setIsScraping(false); // End scraping
      setIsScrapingComplete(true);
      setIsWaiting(false); // Hide waiting message
    } catch (error) {
      console.error('Error fetching website data', error);
      setIsScraping(false); // End scraping in case of error
      setIsWaiting(false);
    }
  };

  const handleViewDataChunks = (page) => {
    setSelectedPageDataChunks(page.dataChunks);
  };

  const handleSubmit = () => {
    if (companyName && companyURL) {
      navigate('/chatbot-integration');
    } else {
      alert('Please fill in both company name and URL');
    }
  };

  return (
    <>
      {/* Scrollbar Style */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #3C364C;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #6D54B5;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #4B4370;
        }
      `}</style>

      <Container sx={{ padding: 2, backgroundColor: '#615B72', height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>Setup Organisation</Typography>
        </motion.div>

        {/* Company Name Input */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <TextField
            variant="outlined"
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              mb: 2,
              input: { color: '#F3EFF4', fontSize: '0.875rem' },
              label: { color: '#757185', fontSize: '0.875rem' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px',
                  borderColor: '#C6C9CB',
                  borderWidth: '0.5px',
                },
                '&:hover fieldset': {
                  borderColor: '#C6C9CB',
                  borderWidth: '0.5px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9185B1',
                  borderWidth: '0.5px',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#9185B1',
              },
            }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <TextField
            variant="outlined"
            label="Company URL"
            value={companyURL}
            onChange={(e) => setCompanyURL(e.target.value)}
            fullWidth
            margin="normal"
            sx={{
              mb: 2,
              input: { color: '#F3EFF4', fontSize: '0.875rem' },
              label: { color: '#757185', fontSize: '0.875rem' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px',
                  borderColor: '#C6C9CB',
                  borderWidth: '0.5px',
                },
                '&:hover fieldset': {
                  borderColor: '#C6C9CB',
                  borderWidth: '0.5px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9185B1',
                  borderWidth: '0.5px',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#9185B1',
              },
            }}
          />
        </motion.div>

        {/* Fetch Button */}
        {!isScraping && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <Button
              onClick={handleFetchData}
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, 
                backgroundColor: '#6B52B0',
                color: '#fff',
                textTransform: 'capitalize',
                borderRadius: '12px',
                padding: '12px 22px',
                mr: 2 }}
            >
              Fetch Website Data
            </Button>
          </motion.div>
        )}

        {/* Scraping Message */}
        {isScraping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ marginTop: '15px', textAlign: 'center' }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Scraping data... Please wait.
            </Typography>
          </motion.div>
        )}

        {/* Display Fetched Pages */}
        {isFetched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
            <Typography variant="h5" sx={{ color: 'white', marginTop: 2 }}>Fetched Pages</Typography>
            <ul style={{ padding: 0, listStyleType: 'none', color: 'white', display: 'flex' }}>
              {pages.map((page) => (
                <motion.li key={page.url} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginBottom: '10px', marginRight: 9 }}>
                  <Typography variant="body1">{page.title}</Typography>
                  <Button onClick={() => handleViewDataChunks(page)} variant="outlined" sx={{ color: 'white', borderColor: 'white', marginTop: 1 }}>
                    View Data Chunks
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Display Data Chunks */}
        {selectedPageDataChunks.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginTop: '15px' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Data Chunks:</Typography>
            <ul style={{ padding: 0, listStyleType: 'none', color: 'white' }}>
              {selectedPageDataChunks.map((chunk, index) => (
                <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ marginBottom: '10px' }}>
                  <Typography variant="body1">{chunk}</Typography>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Submit Button */}
        {isScrapingComplete && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: 2, 
            backgroundColor: '#6B52B0',
            color: '#fff',
            textTransform: 'capitalize',
            borderRadius: '12px',
            padding: '12px 22px',}}>Submit and Continue</Button>
          </motion.div>
        )}
      </Container>
    </>
  );
}

export default SetupOrganisation;
