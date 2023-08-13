const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, phone, username, password } = req.body;
    try {
        const emailUser = await UserModel.findOne({ email });
        if (emailUser) {
            return res.status(400).send({ message: "Username is already exist" });
        }
    }

    catch (err) {
        console.log(err)
    }
}