const router = require("express").Router();
const userController = require("../controllers/user.controller");
// const auth = require("../")

// const {signupController}=userController

router.post("/api/signin", userController.signinController);

router.post("/api/signup", userController.signupController);

// router.delete("/api/deleteUser/:_id",auth,userController.deleteUserController);

router.put("/api/updateUser",userController.updateUser);
module.exports = router;