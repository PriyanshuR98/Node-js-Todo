import { User } from "../models/user.js";
import  bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers =async (req,res)=>{


// };

export const login =async(req,res,next)=>{

    try {
            const{email,password}= req.body;

        const user=  await User.findOne({email}).select("+password");

        if(!user)
        {
            return next(new ErrorHandler("invalid email or password ",400));
        }


        // if(!user)  return res.status(404).json({
        //     success:false,
        //     message:"invalid email or password ",
        // })


        const isMatch = await bcrypt.compare(password,user.password); 

        if(!isMatch) return next(new ErrorHandler("invalid email or password ",400));

        sendCookie(user,res,`Welcome back, ${user.name}`,200);
        
    } catch (error) {
        next(error);
    }


};




export const register = async (req,res)=>{
   
    try {
            const{name,email,password}= req.body;

        let user= await User.findOne({email});

        // if(user)  return res.status(404).json({
        //     success:false,
        //     message:"user already exists",


        // })

        if(user)
        {
            return next(new ErrorHandler("user already exists ",400));
        }


        const hashedpassword= await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password:hashedpassword,

        })

        sendCookie(user,res,"Registered Succesfully",201 );
        
    } catch (error) {
        next(error);        
    }

};





export const getMyProfile =    (req,res)=>{


    

    res.status(200).json({
        success:true,
       user:req.user,

    })

};

export const logout = (req,res) => {

    res.status(200)
    .cookie("token","",{expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    
    })
    .json({

        success:true,
        user: req.user,
       

    })


}


