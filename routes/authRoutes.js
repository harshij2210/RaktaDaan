const express=require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController')
const authMiddleware = require('../middleswares/authMiddleware')

const router=express.Router()

//routes

//register||POST
router.post('/register',registerController)

//login||POST
router.post('/login',loginController)

//Get current user|| GET
router.get('/current-user',authMiddleware,currentUserController)


module.exports =router