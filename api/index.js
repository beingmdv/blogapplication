const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const secret = 'ajflkhjoijot';

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());

mongoose.connect('mongodb+srv://blogapp:blogapp123@cluster0.lxlyoj2.mongodb.net/articleblog?retryWrites=true&w=majority')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const userDoc = await User.create({ username, password: hashedPassword });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) return res.status(400).json('User not found');
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        const token = jwt.sign({ username, id: userDoc._id }, secret);
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json('ok');
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json(info);
    });
});
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(
        {
            id: userDoc._id, username,
        }
    );
});

app.listen(4000, () => console.log('🚀 Server running on port 4000'));
