const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// routes import starts from here

/// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

/// routes starts from here
// app.use("/admin", adminRoutes);

const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://devmistry932:aEXOtzy5Disx0qvP@cluster0.acusbpm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
