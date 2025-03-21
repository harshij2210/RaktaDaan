const express=require('express')

const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController } = require('../controllers/inventoryController');
const authMiddleware = require('../middleswares/authMiddleware')

const router=express.Router()

//routes
//ADD INVENTORY || POST
router.post('/create-inventory',createInventoryController)

//get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController)

//
router.get('/get-inventory-hospital',authMiddleware,getInventoryHospitalController)


//GET DONOR RECORDS
router.get('/get-donars',authMiddleware,getDonarsController)

//GET HOSPITAL RECORDS
router.get('/get-hospitals',authMiddleware,getHospitalController)

//GET ORGANISATION RECORDS
router.get('/get-organisation',authMiddleware,getOrgnaisationController)

//
router.get('/get-organisation-for-hospital',authMiddleware,getOrgnaisationForHospitalController)

module.exports=router;