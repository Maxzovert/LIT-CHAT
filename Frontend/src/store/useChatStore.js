import { create } from "zustand";
import toast from 'react-hot-toast';
import {axiosInstance} from "../Lib/axios";
import {useAuthStore} from "./useAuthStore.js";

export const useChatStore = create((set , get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUser: async () => {
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users : res.data});
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({isUserLoading : false});
        }
    },

    getMessages: async (userId) =>{
        set({isMessagesLoading :true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages : res.data});
        } catch (error) {
         toast.error(error.response.data.messages);   
        } finally {
           set({isMessagesLoading : false});
        }
    },

    sendMessage : async (messageData) => {
        const {selectedUser , messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages , res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const {selectedUser}= get()
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            set({
                message: [...get().message, newMessage],

            })
        })
    },
    setSelectedUser: (selectedUser) => set({selectedUser})
}));