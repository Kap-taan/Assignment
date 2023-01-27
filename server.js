require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/users', userRoutes);

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the Database');

        app.listen(process.env.PORT || 4000, () => {
            console.log('Listening at Port', process.env.PORT || 4000);
        })

    })
    .catch(err => {
        console.log(err);
    })