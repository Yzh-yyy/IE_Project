const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');

const port = process.env.PORT || 8080;
const path = require('path');
const app = express();
app.use(express.static('react-app/dist'));
app.use(cors());
app.use(express.json());

// Handle image upload
app.post('/uploadImage', (req, res) => {
  const imageData = req.body.imageData;
  // Save the image data to a file in the 'sketch_images' folder
  const imagePath = path.join(__dirname, 'sketch_images', 'sketch.png');
  fs.writeFile(imagePath, imageData, 'base64', (err) => {
      if (err) {
          console.error('Error saving image:', err);
          res.status(500).json({ error: 'Error saving image' });
      } else {
          // Call your Python script here, passing the image file path or data
          const { spawn } = require('child_process');
          const pythonProcess = spawn('python', ['predict.py', imagePath]);

          // Handle Python script output
          pythonProcess.stdout.on('data', (data) => {
              console.log(`Python script output: ${data}`);
              // You can send any relevant data back to the client here if needed
          });

          pythonProcess.stderr.on('data', (data) => {
              console.error(`Error from Python script: ${data}`);
          });

          pythonProcess.on('close', (code) => {
              console.log(`Python script exited with code ${code}`);
              // You can send any relevant response back to the client here
              res.json({ message: 'Image received and processed by Python script' });
          });
      }
  });
});



// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6697100',
  password: '26wPzBsrrM',
  database: 'sql6697100'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Route to pull data from 'quiz' table with filtering based on stage and number of rows
app.get('/quiz', async (req, res) => {
  const { stage1, stage2, stage3 } = req.query;
  try {
    // Function to execute a SQL query with parameters and return a promise
    const queryDatabase = (sql, params) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    // Function to fetch random rows for a given stage using a parameterized query
    const fetchRandomRowsForStage = async (stage, count) => {
      const sql = 'SELECT * FROM quiz WHERE stage = ? ORDER BY RAND() LIMIT ?';
      const rows = await queryDatabase(sql, [stage, count]);
      return rows;
    };

    // Fetch and send data for each stage
    const stageData = [];
    for (const stage of [stage1, stage2, stage3]) {
      if (stage) {
        // Parse the input parameters to ensure they are integers
        const stageInt = parseInt(stage[0]);
        const countInt = parseInt(stage[1]);
        
        // Check if the parsed integers are valid numbers
        if (!isNaN(stageInt) && !isNaN(countInt)) {
          const randomRows = await fetchRandomRowsForStage(stageInt, countInt);
          stageData.push(randomRows);
        } else {
          console.error('Invalid input:', stage);
        }
      }
    }

    res.json(stageData);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Error querying database');
  }
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-app', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
