import express from 'express';
const connectDB = require('./config/database');

const app = express();

//Connect Database 
connectDB();

//Init Middleware
app.use(express.json({ extended: false})); 

app.get('/',(req,res) => res.send('API running'));

//Define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));