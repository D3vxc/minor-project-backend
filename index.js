const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import routes
const adminRoutes = require('./admin/admin.routes');
const userRoutes = require('./user/user.route');
const workoutRoutes = require('./Workout/workout.route');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

// Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);

const port = process.env.PORT || 7000;
const mongoURI =
  process.env.MONGO_URI ||
  // 'mongodb+srv://anas:anascr7@anas.qjhcajd.mongodb.net/?retryWrites=true&w=majority';
  'mongodb+srv://minor-project:project123@cluster0.zsj7ci4.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected successfully to MongoDB');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
