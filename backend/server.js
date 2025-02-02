const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const session = require('express-session');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

let verificationCodes = {}; // Store verification codes temporarily

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));

// Registration API
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send('Missing required fields');
  }
  
  const verificationCode = Math.floor(Math.random() * 1000000); // Generate a random 6-digit verification code

  // Store the verification code in memory (for simplicity)
  verificationCodes[email] = verificationCode;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Verification code sent');
  });
});

// Verify Code API
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] && verificationCodes[email] === parseInt(code)) {
    delete verificationCodes[email];
    return res.status(200).send({ success: true });
  } else {
    return res.status(400).send({ success: false, message: 'Invalid verification code' });
  }
});

app.get('/api/fetch-meta', async (req, res) => {
  try {
    const { url } = req.query;

    // List of pages to scrape (can be modified to match real URLs)
    const pagePaths = [
      { title: 'Home', path: '' }, // Home page (main URL)
      { title: 'About Us', path: '/about' },
      { title: 'Contact Us', path: '/contact' },
      { title: 'Products', path: '/products' },
      { title: 'Blog', path: '/blog' },
    ];

    // Function to scrape data from each page
    const scrapePageData = async (pageUrl) => {
      try {
        const response = await axios.get(pageUrl);
        const $ = cheerio.load(response.data);

        // Extract text content (from paragraphs and headings)
        let dataChunks = [];
        $('p').each((i, el) => {
          const text = $(el).text().trim();
          if (text.length > 0) {
            dataChunks.push(text);
          }
        });
        $('h1, h2, h3').each((i, el) => {
          const text = $(el).text().trim();
          if (text.length > 0) {
            dataChunks.push(text);
          }
        });

        return dataChunks;
      } catch (err) {
        console.error('Error scraping page:', err);
        return [];
      }
    };

    // Fetch description from the homepage (or meta description)
    const homepageUrl = `${url}`;
    const homepageData = await axios.get(homepageUrl);
    const $ = cheerio.load(homepageData.data);
    const description = $('meta[name="description"]').attr('content') || 'No description available';

    // Scrape each page and collect data
    const pages = [];
    for (let page of pagePaths) {
      const pageUrl = `${url}${page.path}`;
      const dataChunks = await scrapePageData(pageUrl);
      pages.push({
        title: page.title,
        url: pageUrl,
        status: dataChunks.length > 0 ? 'scraped' : 'pending',
        dataChunks: dataChunks,
      });
    }

    // Send the response with all scraped data
    res.json({
      description,
      pages,
    });
  } catch (error) {
    console.error('Error fetching website data', error);
    res.status(500).send('Error fetching website data');
  }
});

app.post('/api/send-instructions', async (req, res) => {
  const { developerEmail } = req.body;

  if (!developerEmail) {
    return res.status(400).json({ message: 'Developer email is required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const instructions = `
    <h3>Chatbot Integration Instructions</h3>
    <p>Dear Developer,</p>
    <p>To integrate the chatbot into your website, please follow these instructions:</p>
    <p>1. Copy the following script tag and paste it inside the <code>&lt;head&gt;</code> tag of your HTML:</p>
    <pre><code>
      &lt;script src="https://your-chatbot-url.com/chatbot.js"&gt;&lt;/script&gt;
      &lt;script&gt;
        initializeChatbot({
          containerId: "chatbot-container",
          theme: "light",
          welcomeMessage: "Hello! How can I assist you today?"
        });
      &lt;/script&gt;
    </code></pre>
    <p>2. Save the changes and your chatbot will be integrated!</p>
    <p>Best Regards,</p>
    <p>Your Chatbot Service Team</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: developerEmail,
    subject: 'Chatbot Integration Instructions',
    html: instructions,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Integration instructions sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email: ' + error.message });
  }
});




app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
