import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultPageInfo } from "../../__utils/constant";

interface CohortSummaryState {
    cohortSummarySucces: string;
    cohortSummaryError: string;
    pageInfo: any;
}

const rawState: CohortSummaryState = {
    cohortSummarySucces: '',
    cohortSummaryError: '',
    pageInfo: defaultPageInfo
}

interface FetchDataPayload {
   pageNo: number;
   limit: number;
   broker: string;
}

const CohortSummaryReducer = createSlice({
    name: 'CohortSummaryReducer',
    initialState: rawState,
    reducers: {
        cohortSummary: (state: any, action: PayloadAction<FetchDataPayload>) => {
            return { ...state }
        },
        cohortSummarySuccess: (state: any, action: PayloadAction<FetchDataPayload>) => {
            return { ...state, cohortSummarySucces: action.payload }

        },
        cohortSummaryError: (state: any, action: any) => {
            return { ...state, cohortSummaryError: action.payload }
        },
        cohortPageInfo: (state: any, action: any) => {
            return { ...state, pageInfo: action.payload}
        }
    }
})

export const { cohortSummary, cohortSummarySuccess, cohortSummaryError, cohortPageInfo } = CohortSummaryReducer.actions;

export default CohortSummaryReducer;