require("../config/database").connect();

const jwt = require("jsonwebtoken");
const config = require('../config');
const { jwtSecret } = config;
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');


exports.search_user_by_email = async function (email) {
    const user = await User.findOne({ email });
    return user;
}
exports.create_user = async function (first_name, last_name, email, password) {


    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password,
    });
    return user;
}
exports.generate_jwt = async (user) => {
    return jwt.sign(
        { user_id: user._id, email, first_name: user.first_name, last_name: user.last_name },
        jwtSecret,
        {
            expiresIn: "1h",
        }
    );
}