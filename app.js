// Import required modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// const errorHandler = require('./middlewares/errorHandler');
const requestRoutes = require('./routes/requestRoutes');
// const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/database');

const app = express();

//Security headers
app.use(helmet());

app.use(cors());

//Logging HTTP requests
app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();  // Sync models with the database
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Routes
app.use('/api/requests', requestRoutes);
// app.use('/api/products', productRoutes);

// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Route not found' });
// });

// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
