//Using zustand for global state management
import {create} from "zustand";

//passed object is out initial state 
//We can use set to update the state which is a inbuilt function
export const useAuthStore = create((set) => ({
    authUser : null,
    //initially its null bcoz we'll check it later
    isCheckingAuth : true,
}));
