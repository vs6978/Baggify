
const jwt=require("jsonwebtoken");
const generateToken=(user)=>{
    console.log(process.env.JWT_KEY);
    return jwt.sign({email:user._email,id: user._id},process.env.JWT_KEY);
};


module.exports.generateToken=generateToken;