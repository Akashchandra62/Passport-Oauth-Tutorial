const router = require("express").Router();
const passport = require("passport");

router.get('/google', passport.authenticate("google", {
    scope: ["profile"]
}
));



//Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate("google"), (req, res)=>{
    res.redirect("/profile/");
}); 



module.exports = router;