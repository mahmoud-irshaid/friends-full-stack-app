const mongoose= require('mongoose');


const FriendSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:false
    }
});


const FriendModel = mongoose.model('friend' , FriendSchema);

module.exports = FriendModel