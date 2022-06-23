const Joi = require("joi");
const _ = require("lodash");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 4,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  isVerified: {
    type: Boolean,
    default: true,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

function pickdata(userdata) {
  return _.pick(userdata, ["name", "email", "password"]);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.required(),
    password: Joi.string().min(4).max(1024).required(),
  });

  return schema.validate(req);
}

exports.User = User;
exports.pickUserData = pickdata;
exports.validateLogin = validateLogin;
