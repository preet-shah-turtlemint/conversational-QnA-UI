import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultPageInfo } from "../../__utils/constant";

interface BotState {
    botChatMessage: string[];
}

const rawState: BotState = {
    botChatMessage: ["Hi! I am Technology Mahashay, your chat assistant. You can ask me any questions related to Turtlemint and the products offered by us."],
}

const BotChatReducer = createSlice({
    name: 'BotChatReducer',
    initialState: rawState,
    reducers: {
        askBot: (state: any, action: PayloadAction<any>) => {
            return { ...state }
        },
        askBotResponse: (state: any, action: PayloadAction<any>) => {
            console.log(action.payload, "payload")
            return { ...state, botChatMessage: [...state.botChatMessage, action.payload] }

        },
        pushMessage: (state: any, action: PayloadAction<any>) => {
            return { ...state, botChatMessage:  [...state.botChatMessage, action.payload] }
        },
        chatWithAudio: (state: any, action: PayloadAction<any>) => {
            console.log("0123")
            return { ...state }
        },
        chatWithAudioSucces: (state: any, action: PayloadAction<any>) => {
            return { ...state, botChatMessage:  [...state.botChatMessage, action.payload] }
        },
    }
})

export const { askBot, askBotResponse, pushMessage, chatWithAudio, chatWithAudioSucces } = BotChatReducer.actions;

export default BotChatReducer;