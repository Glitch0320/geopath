const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cookie = require("cookie")
const bcrypt = require("bcrypt")
const connection = require("../config/connection")

require("dotenv").config()

const createUser = async (req, res) => {
  try {
    //TODO: validate
    const user = await User.create(req.body)
    res.status(200).json({ message: 'success' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const q = await User.findById(req.params.id)
    res.status(200).json({
      result: "success", payload: {
        count: q.pathCount,
        paths: q.savedPaths,
        dist: q.totalDistance,
        time: q.totalTime,
        name: q.username
      }
    })
  } catch (err) {
    res.status(400).json({ result: "fail", message: 'No user found by that id' })
  }
}

const savePath = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $push: { savedPaths: JSON.stringify(req.body) },
      $inc: { pathCount: 1, totalDistance: req.body.properties.distance, totalTime: req.body.properties.time }
    })
    res.status(200).json({message:'success'})
  } catch (err) {
    res.status(400).json({ result: "fail", message: 'Unable to save path.' })
  }
}

const authenticateLogin = async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username })
  if (!foundUser) return res.status(401).json({ message: "Login failed." })

  const isValid = await bcrypt.compare(req.body.password, foundUser.password)
  if (!isValid) return res.status(401).json({ message: "Login failed." })

  const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET)
  console.log(token)
  res
    .status(200)
    .set({ "auth-token": token })
    .json({ result: "success", token: token })
}

const lookupUserByToken = async (req, res) => {
  if (!req.headers || !req.headers.cookie) return res.status(401).json({ msg: "un-authorized" })

  // The node package named cookie will parse cookies for us
  const cookies = cookie.parse(req.headers.cookie)

  // Get the token from the request headers & decode it 
  const token = cookies["auth-token"]  //cookies.authToken
  if (!token) return res.status(401).json({ msg: "un-authorized" })

  // Look up the user from the decoded token
  const isVerified = jwt.verify(token, process.env.JWT_SECRET)
  if (!isVerified) return res.status(401).json({ msg: "un-authorized" })

  const user = await User.findById(isVerified._id)
  if (!user) return res.status(401).json({ msg: "un-authorized" })

  return res.status(200).json({ result: "success", payload: { _id: user._id } })
}

module.exports = {
  createUser,
  getUserById,
  savePath,
  authenticateLogin,
  lookupUserByToken
}