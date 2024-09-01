import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = (currentConversationId) => {
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Check if the new message belongs to the current conversation
            if (newMessage.conversationId === currentConversationId) {
                dispatch(setMessages([...messages, newMessage]));
            }
        };

        socket?.on("newMessage", handleNewMessage);

        // Cleanup the socket listener when the component unmounts or dependencies change
        return () => socket?.off("newMessage", handleNewMessage);
    }, [socket, messages, currentConversationId, dispatch]);

    return;
};

export default useGetRealTimeMessage;
