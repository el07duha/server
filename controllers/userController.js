const User = require("../models/userModels.js");
const bcrypt = require("bcrypt");
const jwtController = require("./jwtController.js")

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    console.log(response)
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
  }
};

const userLogin = async (req, res) => {

  try {

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(404);
      return;
    }

    const isValidPassowrd = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassowrd) {
      console.log("password is not valid")
      res.status(401);
      return;
    }

    
    const token = jwtController.generateToken(user)
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

const userRegister = async (req, res) => {

  try {
    const existingUser = await User.findOne({
      where: { username: req.body.name }
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      phone_number: req.body.no_hp
    });
    const token = jwtController.generateToken({name:req.body.name, password:hashedPassword})
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error Creating User" });
  }
};

module.exports = {
  "getUsers": getUsers,
  "userRegister": userRegister,
  "userLogin": userLogin
}