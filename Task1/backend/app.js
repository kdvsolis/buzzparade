// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Redirect root URL to frontend's index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/surveys', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM surveys');
    res.render('surveys', { surveys: rows });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/survey/:id', async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { rows: questions } = await pool.query(
      'SELECT * FROM questions WHERE survey_id = $1',
      [surveyId]
    );
    res.render('survey', { questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/survey/:id/response', async (req, res) => {
  try {
    const surveyId = req.params.id;
    const responses = req.body;
    for (const [questionId, responseText] of Object.entries(responses)) {
      await pool.query(
        'INSERT INTO responses (question_id, response_text) VALUES ($1, $2)',
        [questionId, responseText]
      );
    }
    res.redirect('/surveys');
  } catch (error) {
    console.error('Error submitting responses:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
