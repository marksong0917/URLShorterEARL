import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT;

const users = {
  1: {
    id: '1',
    name: {
      first: 'Mark',
      middle: '',
      last: 'Rabey',
    },
    email: 'mark@markrabey.com',
  },
  2: {
    id: '2',
    name: {
      first: 'Steve',
      middle: '',
      last: 'Someguy',
    },
    email: 'steve@stevesomeguy.com',
  },
};

const earls = {
  1: {
    id: '1',
    target: 'https://markrabey.com',
    shortCode: 'xyz123',
    userId: '1',
  },
  2: {
    id: '2',
    target: 'https://stevesomeguy.com',
    shortCode: 'abc987',
    userId: '2',
  },
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = users[1];
  next();
});

// Create
app.post('/', (req, res) => { 
  return res.send('Received POST request');
});

// Read/Retrieve
app.get('/:shortCode', (req, res) => {
  for (let earlId of Object.keys(earls)) {
    const earl = earls[earlId];
    const user = users[earl.userId];
    console.log(user);
    if (earl.shortCode === req.params.shortCode) {
      return res.redirect(earl.target);
    }
  }
  return res.status(404).send('EARL not found');
});

// Update
app.put('/', (req, res) => { 
  return res.send('Received PUT request');
});

// Delete
app.delete('/', (req, res) => { 
  return res.send('Received DELETE request');
});

// Create
app.post('/users', (req, res) => { 
  return res.send('Received POST request');
});

// Read/Retrieve
app.get('/users', (req, res) => { 
  return res.send(users);
});

app.get('/users/:userId', (req, res) => {
  const user = users[req.params.userId];
  const userEarls = {};

  for (let earlId of Object.keys(earls)) {
    const earl = earls[earlId];
    if (earl.userId === user.id) {
      userEarls[earl.id] = earl;
    }
  }

  user.earls = userEarls;

  return res.send(user);
});

app.get('/users/:param1/:param2', (req, res) => {
  return res.send(`Received GET users request on user/${req.params.userId1}`);
});

// Update
app.put('/users/:userId', (req, res) => { 
  return res.send(`Received PUT users request on user/${req.params.userId}`);
});

// Delete
app.delete('/users/:userId', (req, res) => { 
  return res.send(`Received DELETE users request on user/${req.params.userId}`);
});

// Create
app.post('/earls', (req, res) => {
  const id = uuidv4();
  const earl = {
    id,
    shortCode: '3297XZ',
    target: req.body.target,
    userId: req.user.id,
  };

  earls[id] = earl;
  return res.send(earl);
});

// Read/Retrieve
app.get('/earls', (req, res) => { 
  return res.send(earls);
});

app.get('/earls/:earlId', (req, res) => { 
  return res.send(earls[req.params.earlId]);
});

// Update
app.put('/earls/:earlId', (req, res) => { 
  return res.send(`Received PUT earls request on earl/${req.params.userId}`);
});

// Delete
app.delete('/earls/:userId', (req, res) => { 
  return res.send(`Received DELETE earls request on user/${req.params.userId}`);
});

app.listen(PORT, () => {
  console.log(`EARL is running on port ${PORT}!`);
});