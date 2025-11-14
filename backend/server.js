const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRouter = require('./contactRoutes');
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Welcome to Contact System API. Use /contacts for contact operations.');
});

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/contact-system';
console.log('mongo-connection,', mongoUrl);

app.use('/contacts', contactRouter);

// Alias for /contact to /contacts
app.use('/contact', contactRouter);


mongoose.connect(mongoUrl)
.then(() => {
  console.log('connected to the mongo db');
  app.listen(PORT, () => {
    console.log(`server is running on a address of http://localhost:${PORT}`)
  })
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});