const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');

const keys = require('../config/keys');




const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    
    //turn user into id
    done(null, user.id);
    

    
    
});


passport.deserializeUser((id, done) => {
    
    //turn id into user
    
    User.findById(id).then(user => {
        
        
        done(null, user);
        
        
    });
    
    
});


passport.use(
    
    
    new GoogleStrategy(
        
    {
    
    clientID: keys.googleClientID,
    
    clientSecret: keys.googleClientSecret,
    
    callbackURL: '/auth/google/callback' 
    
    }, 
        
    (accessToken, refreshToken, profile, done) => {
        
        // only record different user in database
        
        User.findOne({googleId: profile.id}).then(existingUser => {
            
            
            if(existingUser){
                
                //already have same user
                
                done(null, existingUser);
                
                
            } else{
                
                 new User({googleId: profile.id}).save().then(user => done(null, user));
                
            }
            
        });

        
    }
    
    )
    
           );
