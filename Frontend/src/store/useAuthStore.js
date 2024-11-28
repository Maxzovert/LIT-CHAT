//Using zustand for global state management
import {create} from "zustand";
import {axiosInstance} from "../Lib/axios.js"
//passed object is out initial state 
//We can use set to update the state which is a inbuilt function
export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIng : false,
    isUpdatingProfile : false,
    //initially its null bcoz we'll check it later
    isCheckingAuth : true,

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
    }
}));
