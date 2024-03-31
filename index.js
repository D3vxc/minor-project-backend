const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Import routes
const adminRoutes = require("./admin/admin.routes");
const userRoutes = require("./user/user.route");
const workoutRoutes = require("./Workout/workout.route");
const productRoutes = require("./products/product.route");
const classesRoutes = require("./classes/classes.route");
const trainerRoutes = require("./trainer/trainer.route");
const scheduleRoutes = require("./schedule/schedule.route");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// Routes
// app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/workout", workoutRoutes);
app.use("/products", productRoutes);
app.use("/classes", classesRoutes);
app.use("/trainer", trainerRoutes);
app.use("/schedule", scheduleRoutes);
// app.use("/enroll", )

const port = process.env.PORT || 7001;
const mongoURL =
  process.env.MONGO_URL ||
  "mongodb+srv://minor-project:project123@cluster0.zsj7ci4.mongodb.net/";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected successfully to MongoDB");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
