const mongoose = require ('mongoose');
const bcrypt =require('bycrpt');
const jwt =require ('jsonwebtoken');
 

const userSchema = new mongoose.Schema({

    fullname:{

        firstname:{
           type:String,
           required:true,
           minlength:[3,'first name must be atlest 3 character long'],

        },
        lastname:{
           type:String,
           required:true,
           minlength:[3,'first name must be atlest 3 character long'],
        },
        email:{
           type:String,
           required:true,
           unique:true,
           minlength:[5,'first name must be atlest 5 character long'],

        },
        password:{
            type:String,
           required:true,
           select:false,

        },
        socketId:{
            type:String

        }

    }

})

userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({id:this_id },process.env.JWT_SECRET);
    return token;   

}

userSchema.method.comparePassword=async function(password){
    return await bcrypt.compare(password,this.possword);

}

userSchema.static.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}


const userModel=mongoose.model('user',userSchema);

module.exports = userModel;

