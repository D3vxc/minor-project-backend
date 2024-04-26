const UserModel = require("./user.model");
const MembershipPlanModel = require("../membership/membership.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/otp");
const sendMail = require("../utils/SendMail");

const nodemailer = "nodemailer";
const randomstring = "randomstring";

const sendresetPasswordMail = async (name, email, token) => {
  try {
    nodemailer.createTransport({});
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const register = async (req, res) => {
  const { name, phone, email, password, address } = req.body;
  try {
    const UserEmail = await UserModel.findOne({ email });
    if (UserEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !address.country
    ) {
      return res
        .status(400)
        .json({ message: "Complete address information is required" });
    }

    const newUser = await UserModel.create({
      name,
      phone,
      email,
      password: hashPassword,
      address,
      isVerified: true,
    });

    res
      .status(201)
      .send({ data: newUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
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

    res
      .status(200)
      .json({ token, message: "User LoggedIn Successfully :)", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMembership = async (req, res) => {
  const { userId, membershipPlanId, expiryDate } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          membershipPlanDetails: membershipPlanId,
          expiryDate: expiryDate,
        },
      },
      { new: true }
    ).populate("membershipPlanDetails");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Membership updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).send({ message: "Error updating membership" });
  }
};

function generateToken(userId) {
  return jwt.sign({ userId }, "secret", { expiresIn: "1h" });
}

const forget_password = async (req, res) => {
  try {
    const userdata = await UserModel.findOne({ email: req.body.email });
    if (!userdata) {
      return res
        .status(400)
        .send({ success: false, message: "Email not found" });
    }
    const otp = generateOTP();
    sendMail(
      req.body.email,
      "Reset Password",
      `Your OTP is ${otp}. This OTP is valid for 10 minutes`
    );
    const user = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { otp },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, data: user, message: "OTP sent to your email" });
  } catch (error) {
    res.status(400).send({ success: false, message: "Email not found" });
  }
};
const reset_password = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user.otp !== Number(req.body.otp)) {
      return res.status(400).send({ success: false, message: "Invalid OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: hashPassword } },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, data: updatedUser, message: "Password updated" });
  } catch (error) {
    res.status(400).send({ success: false, message: "Email not found" });
  }
};

const getSelf = async (req, res) => {
  // console.log("req.user", req.user);
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).populate(
      "membershipPlanDetails"
    );

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "An error occurred" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  forget_password,
  reset_password,
  getSelf,
  logout,
  updateMembership,
};
