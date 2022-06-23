const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const route = express.Router();
const { TokenVerification } = require("../models/tokenVerification");
const { User, pickUserData } = require("../models/user");

route.post("/add", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(pickUserData(req.body));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(200).send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = route;
