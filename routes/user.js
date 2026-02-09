const express = require("express");
const User = require("../models/User.js");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

router.post("/user/signup", async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json("Missing parameters");
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json("Email already used");
    }

    const salt = uid2(16);
    const hash = SHA256(req.body.password + salt).toString(encBase64);
    const token = uid2(32);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    const responseObject = {
      _id: newUser._id,
      token: newUser.token,
    };

    return res.status(201).json(responseObject);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) {
      return res.status(401).json("Unauthorized");
    }
    const newHash = SHA256(req.body.password + userFound.salt).toString(
      encBase64
    );
    if (newHash !== userFound.hash) {
      return res.status(401).json("Unauthorized");
    }
    const responseObject = {
      _id: userFound._id,
      token: userFound.token,
      admin: userFound.admin,
    };
    return res.status(200).json(responseObject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
