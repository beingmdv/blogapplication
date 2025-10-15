
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadmiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const models = require('./models/Post');
const Post = require('./models/Post');


const SECRET = process.env.JWT_SECRET || 'ajflkhjoijot';

app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors({
  origin: ['https://blogapplications-ae6q.onrender.com' ],
  credentials: true,
}));
app.use(express.json());

mongoose.connect('mongodb+srv://blogapp:blogapp123@cluster0.lxlyoj2.mongodb.net/articleblog?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
    const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDoc = await User.create({ username, password: hashed });
 


    const userSafe = { id: userDoc._id, username: userDoc.username };
    res.json(userSafe);
  } catch (e) {
    console.error('Register error:', e);
    res.status(400).json({ error: 'Registration failed' });
  }
});


app.post('/login', async (req, res) => {
  try {


    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) return res.status(400).json({ error: 'User not found' });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      const token = jwt.sign({ username, id: userDoc._id }, SECRET);
      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
      return res.json({ id: userDoc._id, username });
    } else {
      return res.status(400).json({ error: 'Wrong credentials' });
    }
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  

  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out' });
});


app.post('/post', uploadmiddleware.single('files'), async (req, res) => {
  try {
    const { originalname, path: tempPath } = req.file;
    const ext = originalname.split('.').pop();
    const newPath = tempPath + '.' + ext;
    fs.renameSync(tempPath, newPath);
    const coverPath = '/uploads/' + path.basename(newPath);
    const postDoc = await Post.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      author: req.body.author,
      cover: coverPath
    });
    console.log("saved coverPath:", coverPath);
    console.log("postDoc.cover from DB:", postDoc.cover);
    res.json(postDoc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not create post' });
  }
});




app.get('/post', async (req, res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    

);
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
