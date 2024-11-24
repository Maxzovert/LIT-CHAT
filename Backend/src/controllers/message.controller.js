import User from "../models/user.model";
import Message from "../models/message.model.js"

//Get user for sidebar
export const getUserForSidebar = async (req , res) => {
try {
    //grabbign logged in user id  form database
    const loggedInUserId = req.user._id;
    //filtering all users except the logged in user without the password
    const filteredUsers = await  User.find({_id : {$ne : logged}}).select("-password")

    res.status(200).json(filteredUsers)
} catch (error) {
    console.error("Error in getUserForSidebar" , error.message);
    res.status(500).json({error : "Internal server error"});
}
}

//get messeges to show 
export const getMessages = async (req , res) => {
    try {
        const {id : userToChatId } = req.params 
        const senderId = req.user._id;

        //finding the messages of both sender or revciver 
        const messages = await Message.find({
            $or : [
                {
                    senderId : senderId , receiverId : userToChatId
                },
                {
                    senderId : userToChatId , receiverId : senderId
                }
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller : " , error.message);
        res.status(500).json({error : "Internal server error"});
    }
}