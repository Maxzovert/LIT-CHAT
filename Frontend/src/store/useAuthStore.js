//Using zustand for global state management
import {create} from "zustand";
import {axiosInstance} from "../Lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";
//passed object is out initial state 
//We can use set to update the state which is a inbuilt function
export const useAuthStore = create((set, get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIng : false,
    isUpdatingProfile : false,
    onlineUsers: [],
    //initially its null bcoz we'll check it later
    isCheckingAuth : true,
    socket : null,
//TO check authentication
    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            //Set authenticaation data if user authenticated with correct credential
            set({authUser : res.data});
            get().connectSocket()
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
          get().connectSocket();
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
            get().connectSocket();
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
        get().disconnectSocket();
    } catch (error) {
        toast.error(error.response.data.message)
    }
    },

    connectSocket: () => {
        const {authUser} = get()
        // DO not make this connection if user is not authenticated or already authenticated
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query : {
                userId : authUser._id,  
            }
        }
        )
        socket.connect();

        set({socket : socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds})
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },

}));
