const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

//login
const loginUser = async (req, res) => {
    res.json({ mess: 'login user' });
}

//signup
const signupUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.signup(email, password);

        //create Token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(4040).json({ error: error.message });
    }

}

module.exports = { signupUser, loginUser };