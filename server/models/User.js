const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  username: { type: String, unique: true },
  savedPaths: [{ type: String }],
  pathCount: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
  password: { type: String }
})

UserSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next()
})

const User = model("User", UserSchema)
module.exports = User