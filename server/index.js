const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();        
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(err => console.error('Could not connect to MongoDB:', err));
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);  
});
