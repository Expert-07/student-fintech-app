const express = require('express');
const cors = require('cors');

const dontenv = require('dotenv');
dontenv.config();


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const authRoutes = require('./routes/auth');

const walletRoutes = require('./routes/wallet');

app.use(express.json());
app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    next();
})
//Routes

app.use('/api/auth', authRoutes);

app.use('/api/wallet', walletRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

//timetable route
const timetableRoutes = require('./routes/timetableRoutes');
app.use('/api/timetable', timetableRoutes);

const reminderRoutes = require('./routes/reminderRoutes');
app.use('/api/reminders', reminderRoutes);

app.use('/api/timetable/upcoming', reminderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port: " ${PORT}`)
    
);