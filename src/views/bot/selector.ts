import { createDraftSafeSelector } from "@reduxjs/toolkit";


const reducer = 'BotChatReducer';
const ChatResponse = (state: any) => state;

const ChatResponseSelector = createDraftSafeSelector(ChatResponse, (state: any) => {
    return state[reducer]
})

export default ChatResponseSelector;