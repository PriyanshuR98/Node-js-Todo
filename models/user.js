import mongoose from "mongoose";

const schema= mongoose.Schema({
    name:{

      type:String,
      required:true,
    
    },

    email:{
      type:String,
      unique:true,
      required:true,
    },

    password:{
      type:String,
      // this would literally not make req.passowrd work we have to use select..
      select:false,
      required:true,
    },

    createdAt :{
      type:Date,
      default:Date.now,

    },

   
  });

  export const User= mongoose.model("User",schema);
  



