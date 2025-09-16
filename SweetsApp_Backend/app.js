const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/authController');
const purchaseController = require('./controllers/purchaseController');
const cors = require('cors')

const mithaiRoutes = require('./routes/mithaiRoutes');
const directortRoutes = require('./routes/directoryRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')

// Initialize Express app
const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors())

// Sync models with database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

syncModels();

app.post('/register', userController.register);
app.post('/login', userController.login);

app.use(authMiddleware);

app.use('/mithai', mithaiRoutes)
app.use('/directory', directortRoutes)
app.use('/invoices', invoiceRoutes )

app.post('/purchase', purchaseController.buyMithai);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
