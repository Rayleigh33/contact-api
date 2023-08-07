const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
const registerUser = asyncHandler (async (req,res)=>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user create ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message: "register the user"});
});

//login user
const loginUser = asyncHandler (async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }

    const user = await User.findOne({email});

    //compare with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
        );
        res.status(200).json({accesstoken});
    }
    else{
        res.status(401);
        throw new Error("email or password is incorrect");
    }
    res.json({message: "login user"});
});

//current user
const currentUser = asyncHandler (async (req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser}