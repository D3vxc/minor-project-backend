const AdminModel = require("./admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminEmail = await AdminModel.findOne({ email });
    if (adminEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newAdmin = new AdminModel({
      email,
      password: hashPassword,
    });

    res
      .status(201)
      .send({ data: newAdmin, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
};
