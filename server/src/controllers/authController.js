const userModel = require("../models/authModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config();

const signup = async (req, res) => {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;


  //   check user exists already or not
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(401).json({ message: "user already exists" });
  }
//   hasing the password to store 
  const hashPassword = await bcrypt.hash(password, 10);

//   storing the data into db
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashPassword,
  });
// generating the jwt token for storing into cookie
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

// token storing into the browser cookie
  res.cookie("token", token);

//   finally response
  res.status(201).json({
    message: "user created successfully",
    user:{
        email: user.email,
        _id: user._id,
        fullName: user.fullName
    }
  })

};
const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message: "Invalid email or password "})
    }
    const isPasswordValid  = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid password"})
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({message: "User Loggedin Successfully", user:{
        email: user.email,
        id: user._id,
        fullName: user.fullName
    }})

};

module.exports = { signup, login };
