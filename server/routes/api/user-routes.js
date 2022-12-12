const router = require('express').Router()

const { getUserById, createUser, authenticateLogin, lookupUserByToken } = require('../../controllers/user-controller')

// Declare the routes that point to the controllers above
router.route('/').post(createUser)

router.route("/auth").post(authenticateLogin)
router.route("/lookup").get(lookupUserByToken)

router.route('/:id').get(getUserById)

module.exports = router