const mongoose = require("mongoose")
require('dotenv').config()
 
mongoose.connect('mongodb+srv://glitch0320:M7cFYUbdhrCDnP1X@geopath.u5ab3hu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection