const AdminModel = require("./admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { phone, email, password } = req.body;
  try {
    const adminPhone = await AdminModel.findOne({ phone });
    if (adminPhone) {
      return res.status(400).json({ message: "Phone already exists" });
    }

    const adminEmail = await AdminModel.findOne({ email });
    if (adminEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAdmin = await AdminModel.create({
      phone,
      email,
      password: hashPassword,
    });
    res
      .status(201)
      .send({ data: newAdmin, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const login = async (req, res) => {
  console.log("===>", req.body);

  try {
    const admin = await AdminModel.findOne({
      email: req.body.email,
    });

    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    // Create a JWT token
    const token = jwt.sign(
      { _id: admin._id, email: admin.email },
      "yourSecretKey",
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
};
