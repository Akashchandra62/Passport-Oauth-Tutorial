const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../model/user-google");

passport.serializeUser((user, done)=>{
    done(null, user.id);

})
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })

})

passport.use(
    new GoogleStrategy({
        //Options for Google Strategy
        callbackURL : "/auth/google/redirect",
        clientID : process.env.clientID, //ADD client ID
        clientSecret : process.env.clientSecret  //Add client secret

    }, (accessToken, refreshToken, profile, done)=>{
        //Callback for Google Strategy
        User.findOne({googleid : profile.id})
        .then((currentUser)=>{
            if(currentUser){
                console.log("User already exist" + " " + currentUser);
                done(null, currentUser);
            }
            else{
                User.create({
                    username : profile.displayName,
                    googleid : profile.id
                })
                .then((result) => {
                    console.log("Created successfully : " + result);
                    done(null, result);
                    
                })
            }
        })
       .catch((err) => {
            console.log("Error in creating from passport callback");
        });
    }
    )
)

//ClienID : 994461052885-3qm6j0maornulb9cekrj3d52j2ejl7vf.apps.googleusercontent.com
//client Secret : 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