const usermodel = require("../models/usermodel");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const registerController =async(req,res)=>{
try{
const existingUser=await usermodel.findOne({email:req.body.email})
if(existingUser){
    return res.status(200).send({
        success:false,
        message:'user is already exists'
    })
}


const salt=await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password,salt)
req.body.password=hashedPassword

const user =new usermodel(req.body)
await user.save()
return res.status(201).send({
    success:true,
    message:'user registered successfully',
user,
}) 

}
catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in register API",
        error
    })
}

};
//login call back
const loginController=async(req,res)=>{
    try{
const user=await usermodel.findOne({email:req.body.email})
if(!user){
    return res.status(404).send({
       success:false,
       message:"invalid credentials" 
    })
}
if(user.role!==req.body.role){
    return res.status(500).send({
        success:false,
        message:"role doesnt found",
    })
}


//password comparison
const comparePassword=await bcrypt.compare(req.body.password,user.password)
if(!comparePassword){
    return res.status(500).send({
        success:false,
        message:"invalid credentials"
    })
}
const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
return res.status(200).send({
    success:true,
    message:'login successfully',
    token,
    user,
});
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login API",
            error
        })
    }
};

//GET current user
const currentUserController =async(req,res)=>{
    try{
const user=await usermodel.findOne({_id:req.body.userId})
return res.status(200).send({
    success:true,
    message:"user fetched successfully",
    user,
})
    }
catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'unable to get current user',
        error
    })

}
};

module.exports={registerController,loginController,currentUserController};





