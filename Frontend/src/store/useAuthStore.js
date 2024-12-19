//Using zustand for global state management
import {create} from "zustand";
import {axiosInstance} from "../Lib/axios.js"
import Signup from "../Pages/Signup.jsx";
import toast from "react-hot-toast";
//passed object is out initial state 
//We can use set to update the state which is a inbuilt function
export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIng : false,
    isUpdatingProfile : false,
    onlineUsers: [],
    //initially its null bcoz we'll check it later
    isCheckingAuth : true,
//TO check authentication
    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            //Set authenticaation data if user authenticated with correct credential
            set({authUser : res.data})
        } catch (error) {
            //null if its wrong
            console.log("error in checkauth" , error)
            set({authUser : null})
        } finally {
            set({ isCheckingAuth : false});
        }
    },
// TO authenticate user with form data
    signup: async (data) => {
        set({isSigningUp : true});
        try {
          const res =  await axiosInstance.post("/auth/signup", data);
          //Setting authUser to form data so that user get authnticated as they signup
          set({authUser : res.data});
          toast.success("Account created Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp : false})
        }
    },
//Login function
    login: async (data) => {
        set({isLoggingIng : true});
        try {
            const res = await axiosInstance.post("/auth/login" , data);
            set({authUser : res.data});
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingIng : false});
        }
    },

//Profile picture update funtion
    updateProfile : async (data) => {
    set({isUpdatingProfile : true});
    try {
        const res = await axiosInstance.put("/auth/update-profile", data ,{
            withCredentials : true,
        });
        set({authUser : res.data});
        toast.success("Profile Update Successfully")
    } catch (error) {
        console.log("Error in  update profile", error);
        toast.error(error.response.data.message);
    } finally{
        set({isUpdatingProfile : false})
    }
    },
//Logout function
    logout : async () => {
    try {
        await axiosInstance.post("/auth/logout");
        set({authUser : null});
        toast.success("Logged Out Successfully")
    } catch (error) {
        toast.error(error.response.data.message)
    }
    },

}));
