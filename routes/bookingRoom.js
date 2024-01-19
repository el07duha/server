const express = require("express");
const orderController = require("../controllers/orderController.js");

const router = express.Router();
router.use(express.json());

router.post("/room", orderController.bookingRoom)

router.get("/getBookingRooms", orderController.getBookingRoom)

module.exports = router

