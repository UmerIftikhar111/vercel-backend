const router = require("express").Router();

const { Signup, Signin } =  require("../Controller/userController");


router.post("/signup", Signup);
router.post("/signin", Signin);


module.exports= router;
