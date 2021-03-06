const jwt = require("jsonwebtoken");
const config = require('../config');
const { jwtSecret } = config;
// Cargamos los modelos para usarlos posteriormente
const User = require('../models/user');

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
  

exports.search_user_by_email = async function (email) {
    const user = await User.findOne({ email })
    return user;
}
exports.create_user = async function (first_name, last_name, email, password) {


    const user = await User.create({
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return new Object({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: '',
    });
    //return user;
}
exports.generate_jwt = async (user) => {
    return jwt.sign(
        { user_id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name },
        jwtSecret,
        { expiresIn: "1h", }
    );
}