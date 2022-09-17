const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: string,
        unique: true,
        required: true
    },
    password: {
        type: string,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
}


module.exports = mongoose.model('User', userSchema);