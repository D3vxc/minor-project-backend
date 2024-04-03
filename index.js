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
// const userLoginRoute = require("./user/userLogin.route");
// const scheduleRoutes = require("./schedule/schedule.route");
const cartRoutes = require("./cart/cart.route");

// Import authentication middleware
const { authenticate } = require("./middleware/auth.middleware.js"); // Adjust path as needed

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// Routes
app.use("/admin", adminRoutes);
app.use("/products", productRoutes); // Public route
app.use("/classes", classesRoutes); // Protected route
app.use("/user", authenticate, userRoutes); // Assuming login and registration don't require auth
app.use("/workout", authenticate, workoutRoutes); // Example of protected route
app.use("/trainer", authenticate, trainerRoutes); // Protected route
app.use("/cart", authenticate, cartRoutes); // Cart operations should be protected
// app.use("/userlogin", userLoginRoute);
// app.use("/schedule", authenticate, scheduleRoutes); // Protected route

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
