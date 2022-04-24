require("dotenv").config();
const  express = require('express')
const app = express()
const indexRoute = require("./routes/index-Route")
const authRoute = require("./routes/auth-Route")
const passport = require("passport")
const passportSetup = require("./config/passport-google-setup")
const cookieSession = require("cookie-session");
const port = 3000

//Set us static folde
app.use(express.static("public"))

//Database
require("./db/connection")

//Session
app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys : ["abcde", "abcfgh", "secretKey"],
}))

//Initialise passport(for session)
app.use(passport.initialize());
app.use(passport.session());



//set up view engine
app.set("view engine", "ejs")

//Set up Route 
app.use(indexRoute);
app.use("/auth",authRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`))