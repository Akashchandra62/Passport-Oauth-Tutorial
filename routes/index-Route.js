const router = require("express").Router();

const authenticateRequest = (req, res, next)=>{
    if(!req.user){
        res.redirect("/login")
    }
    else{
        next()
    }
}

router.get('/', (req, res) => res.render('home', {user : req.user}));
router.get('/login', (req, res) => res.render('login' , {user : req.user}));

router.get("/profile", authenticateRequest ,(req, res)=>{
    res.render("profile", {user:req.user})
} )

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/")
})

module.exports = router;