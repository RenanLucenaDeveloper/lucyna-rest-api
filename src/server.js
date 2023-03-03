const express = require('express');
const AuthController = require('./controllers/AuthController');
const AdminController = require('./controllers/AdminController');
const authenticateMiddleware = require('./middlewares/authenticate');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', AuthController);

app.use('/admin', authenticateMiddleware, AdminController);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log('o servidor está funcionando');
});
