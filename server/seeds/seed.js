const User = require("../models/User")
const connection = require('../config/connection')

const testUser = {
  _id: '63975f91ab6872f4a41cb2cd',
  username: 'Test',
  savedPaths: [
    JSON.stringify({
        "distance": 16093,
        "date": '12/15/2022',
        "time": 3600,
        "top_speed": 9
        })
  ],
  pathCount: 1,
  totalDistance: 16093,
  totalTime: 3600,
  password: 'hashthis'
}

const seed = async () => {
  await User.deleteMany({})
  await User.create(testUser)
  console.log('username: Test, password: hashthis')
  process.exit()
}


seed();