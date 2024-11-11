const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB =require('./config/db')
const bookRoutes=require( './routes/bookRoutes')




dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/books', bookRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

