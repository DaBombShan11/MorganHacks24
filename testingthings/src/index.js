const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const fs = require('fs');
const { scheduleToMongoDB, kidToMongoDB } = require('./utils/jsonToMongoDB');
// const scheduleJson = require('src/models/staticData/scheduleData.json');

const app = express();
app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT;
const DATABASE_CONNECTION = process.env.DATABASE_CONNECTION;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// kidToMongoDB('src/models/staticData/kidsData.json');
// scheduleToMongoDB('src/models/staticData/scheduleData.json');

mongoose.connect(DATABASE_CONNECTION)
        .then(() => {
            console.log('Connected to database!');
        }).catch(err => {
            console.error('App starting error:', err.stack);
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});