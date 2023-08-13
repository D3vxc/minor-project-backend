const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, username, phone, password } = req.body;
    try {
        const emailUser = await UserModel.findOne({ email });
        if (emailUser) {
            return res.status(400).send({ message: "User is already exist" });
        }
        const Username = await UserModel.findOne({ username });
        if (Username) {
            return res.status(400).send({ message: "Username is already exist" });
        }
        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt);
        const newuser = await UserModel.create({
            email,
            username,
            phone,
            password: hashedPassword,
        });
        res
            .status(201)
            .send({ data: newuser, message: "User create successfully" })
    }

    catch (err) {
        res.status(500).send(err);
    }
}

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

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

function generateToken(userId) {
    return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
}

module.exports = { register, login };