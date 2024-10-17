// Imports
require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const logRoutes = require('./middleware/logRoutes');

// controller imports
const authRouter = require('./middleware/routes/authRouter');
const userRouter = require('./middleware/routes/userRouter');
const goalRouter = require('./middleware/routes/goalRouter');
const reminderRouter = require('./middleware/routes/reminderRouter');
const ritualRouter = require('./middleware/routes/ritualRouter');

const app = express();


// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

// Routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);
app.use('/api/reminders', reminderRouter);
app.use('/api/rituals', ritualRouter);

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
