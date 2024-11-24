import mongoose, { mongo } from "mongoose"

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        receiverId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        text :{
            type : String,
        },
        image:{
            type : String,
        },
    },
    {timestamps : true}
);
//To access schema in various parts of the backend
const Message = mongoose.model("Message" , messageSchema);

export default Message;