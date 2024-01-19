const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
router.use(express.json());

router.post("/signup", userController.userRegister)

router.get("/users", userController.getUsers)

router.post("/login", userController.userLogin)


module.exports = router;
