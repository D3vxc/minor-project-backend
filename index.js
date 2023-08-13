const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Uroute = require("./user/user.route")
// routes import starts from here
const adminRoutes = require("./admin/admin.routes");

/// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use("/user", Uroute)

/// routes starts from here
app.use("/admin", adminRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://devmistry932:aEXOtzy5Disx0qvP@cluster0.acusbpm.mongodb.net/?retryWrites=true&w=majority`,
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