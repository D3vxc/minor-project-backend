const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, phone, email, password } = req.body;
    try {
        const UserEmail = await UserModel.findOne({ email });
        if (UserEmail) {
            return res.status(400).json({ message: "Email already taken" });
        }


        const phoneUser = await UserModel.findOne({ phone });
        if (phoneUser) {
            return res.status(400).json({ message: "enter different phone number" });
        }

        const emailUser = await UserModel.findOne({ email });
        if (emailUser) {
            return res.status(400).json({ message: "email already exists" });
        }



        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            username,
            phone,
            email,
            password: hashPassword,
        });
        res
            .status(201)
            .send({ data: newUser, message: "User created successfully" });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
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

        res.status(200).json({ token, message: "User Login Successfully :)" } );
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}

function generateToken(userId) {
    return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
}

module.exports = { register, login };