import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            required : true,
            unique : true,
        },
        fullName : {
            type : String,
            required : true,
        },
        password:{
            type : String,
            required : true,
            minlength : 6,
        },
        profilePic:{
            type : String,
            default : ""
        }
    },
    {timestamps : true}
);
//To access schema in various parts of the backend
const User = mongoose.model("User" , userSchema);

export default User;