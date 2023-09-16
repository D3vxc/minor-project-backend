const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// routes import starts from here
const adminRoutes = require("./admin/admin.routes");
const userRoutes = require("./user/user.route")
const workout = require("./Workout/workout.route")

/// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

/// routes starts from here
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/workout", workout);

const port = process.env.PORT || 7000;

mongoose.connect(
  `mongodb+srv://anas:anascr7@anas.qjhcajd.mongodb.net/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});