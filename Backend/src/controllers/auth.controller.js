import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

//Create user or sign up
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
    try {

      if (!fullName || !email || !password) {
        return res.status(400).json({message : "All fields are required"});
      }
      //Hash password
      if (password.length < 6) {
        return res.status(400).json({message : "Password must be atleast 6 chracters"})
      }
      const user = await User.findOne({email})

      if (user) return res.status(400).json({message : "Email alredy exist"})

        const salt = await bcrypt.genSalt(10);

        const hashPass = await bcrypt.hash(password,salt);

        const newUser = new User({
          fullName,
          email,
          password : hashPass
        })

        if(newUser){
          //generate jwt token
          generateToken(newUser._id,res)
          await newUser.save();

          res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic
          })
        }else{
          return res.status(400).json({message : "Invalid credential"})
        }
    } catch (error) {
      console.log("Error is signUp controller", error.message);
      return res.status(500).json({message : "Internal server error"})
    }
  };

//Login 
export const login = async (req, res) => {
  const {email , password} = req.body;
    try {
      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({message : "Invalid Credential"})
      }

      const isPassCorrest = await bcrypt.compare(password, user.password)
      if (!isPassCorrest) {
        return res.status(400).json({message : "Invalid Credential"})
      }

      generateToken(user._id,res)

      res.status(200).json({
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
        profilePic : user.profilePic
      })
    } catch (error) {
      console.log("Error is Login controller", error.message);
      return res.status(500).json({message : "Internal server error"})
      
    }
  };
  
//Logout
export const logout = (req, res) => {
    try {
      res.cookie("jwt" , "" , {maxAge : 0})
      res.status(200).json({message : "Logged Out Sucessfully"})
    } catch (error) {
      console.log("Error is Logout controller", error.message);
      return res.status(500).json({message : "Internal server error"})
    }
  };

//Update Profile
export const updateProfile = async (req , res) => {
  
}