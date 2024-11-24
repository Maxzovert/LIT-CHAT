import User from "../models/user.model";

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