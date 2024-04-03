const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/otp");
const sendMail = require("../utils/SendMail");

const nodemailer = "nodemailer";
const randomstring = "randomstring";

const userLoginWithoutToken = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    console.log("User Login Successfully :)", user, token);

    res
      .status(200)
      .json({ token, message: "User Login Successfully :)", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// const register = async (req, res) => {
//   const { name, phone, email, password } = req.body;
//   try {
//     const UserEmail = await UserModel.findOne({ email });
//     if (UserEmail) {
//       return res.status(400).json({ message: "invalid email" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const newUser = await UserModel.create({
//       name,
//       phone,
//       email,
//       password: hashPassword,
//       isVerified: true,
//     });
//     res
//       .status(201)
//       .send({ data: newUser, message: "User created successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(error);
//   }
// };
// const getUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await UserModel.findByIdAndRemove(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// function generateToken(userId) {
//   return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
// }

// const forget_password = async (req, res) => {
//   try {
//     const userdata = await UserModel.findOne({ email: req.body.email });
//     if (!userdata) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Email not found" });
//     }
//     const otp = generateOTP();
//     sendMail(
//       req.body.email,
//       "Reset Password",
//       `Your OTP is ${otp}. This OTP is valid for 10 minutes`
//     );
//     const user = await UserModel.findOneAndUpdate(
//       { email: req.body.email },
//       { otp },
//       { new: true }
//     );
//     return res
//       .status(200)
//       .send({ success: true, data: user, message: "OTP sent to your email" });
//   } catch (error) {
//     res.status(400).send({ success: false, message: "Email not found" });
//   }
// };
// const reset_password = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({
//       email: req.body.email,
//     });
//     if (user.otp !== Number(req.body.otp)) {
//       return res.status(400).send({ success: false, message: "Invalid OTP" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);
//     const updatedUser = await UserModel.findOneAndUpdate(
//       { email: req.body.email },
//       { $set: { password: hashPassword } },
//       { new: true }
//     );
//     return res
//       .status(200)
//       .send({ success: true, data: updatedUser, message: "Password updated" });
//   } catch (error) {
//     res.status(400).send({ success: false, message: "Email not found" });
//   }
// };
module.exports = {
  userLoginWithoutToken,
};
