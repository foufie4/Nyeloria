require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.json());

//sessions 
app.use(
    session({
        secret: 'mongodb+srv://sorafyl:tIcMF0JnJRTPJpUI@nyeloria.fx0qezd.mongodb.net/?retryWrites=true&w=majority&appName=nyeloria',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, //1 jour
    })
);

//connexion mongodb
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.error(err));

//routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//page de test racine
app.get('/', (req, res) => {
    res.send('Nyeloria backend en ligne');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found'});
});

//démarrage serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});