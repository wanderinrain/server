const mongoose = require('mongoose');


const {Schema} = mongoose;


//for collection


const userSchema = new Schema ({
    
    
    googleId: String
 
    
    
});


mongoose.model('users', userSchema);



