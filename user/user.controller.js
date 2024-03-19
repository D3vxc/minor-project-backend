const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nodemailer = ("nodemailer");
const randomstring = ("randomstring");

const sendresetPasswordMail = async(name, email, token)=>
{
  try {
    nodemailer.createTransport({
      
    })
  } catch (error) {
    res.status(400).send({success:false,message:error.message});
  }
}

const register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const UserEmail = await UserModel.findOne({ email });
    if (UserEmail) {
      return res.status(400).json({ message: "invalid email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      phone,
      email,
      password: hashPassword,
      isVerified: true,
    });
    
    res
      .status(201)
      .send({ data: newUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).send(error);
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

    res.status(200).json({ token, message: "User Login Successfully :)" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

function generateToken(userId) {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
}

const forget_password = async (req, res) => 
{
      try {
        const  userdata = await UserModel.findOne({email:req.body.email});

        if (userdata) {
          const randomString = randomstring.generate();
          const data = await UserModel.updateOne({email:email},{$set:{token:randomString}});
          res.status(400).send({success:true,message:"please check your "});
        } else {
          res.status(400).send({success:true,message:"This email does not exists.."});
        }
        
      } catch (error) {
        res.status(400).send({success:false,message:"Email not found"});
      }
}

module.exports = { register, login, getUsers };
