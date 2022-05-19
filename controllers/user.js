const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');
const { jwtSecret } = config;
// const express = require('express');
// Cargamos el servicio
const UserService = require('../services/user');

exports.register = async function (req, res) {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await UserService.search_user_by_email(email);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await UserService.create_user(first_name, last_name, email, encryptedPassword);

        // Create token
        const token = await UserService.generate_jwt(user);
        // save user token
        user.token = token;

        // return new user
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.login = async function (req, res) {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserService.search_user_by_email(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = await UserService.generate_jwt(user);

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

exports.welcome = async function (req, res) {
    res.status(200).send(`Welcome ${req.user.first_name} 🙌`);
}