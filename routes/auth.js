const express = require("express");
const router = express.Router();
const bcyrpt = require("bcrypt");
const { User } = require("../models/user.js");
const mongoose = require("mongoose");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcyrpt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  res.send(true);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
