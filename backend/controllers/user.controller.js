import bcrypt from "bcrypt";
import usermodel from "../models/user.model.js";
import { generatetoken } from "../utils/generateToken.js";
import codemodel from "../models/Deploy.model.js"
export async function handleSignup(req, res) {
  try {
    const { username, password, email, phonenumber } = req.body;

    if (!username || !password || !email || !phonenumber) {
      return res.status(400).json({
        message: "Fill all the fields",
        success: false,
      });
    }

    // Check for existing user by email or phone number
    const isEmail = await usermodel.findOne({ email });
    const isNumber = await usermodel.findOne({ phonenumber });

    if (isEmail || isNumber) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      username,
      email,
      password: hashPassword,
      phonenumber,
    });

    return res.status(200).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

export async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all the fields",
        success: false,
      });
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    // Generate token and send response
    generatetoken(res, user);
    
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}


export async function handleGetOneUser(req,res){
    try{
     
   
      const user = await usermodel.findById(req.params.id)
      console.log(user)

      const codes = await codemodel.find({createdBy:req.params.id})
      
      if(!user){
        res.status(400).json({
          message:"User Not Found",
          success:false
        })
      }
      res.json({
        message:"user found",
        user,
        projects:codes
      })
    }
    catch(e){
      console.log(e)
    }
}


