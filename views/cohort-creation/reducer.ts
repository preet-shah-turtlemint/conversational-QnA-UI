import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CohortCreationState {
    count: number;
    cohortSuccess: string;
    cohortError: string;
}

const rawState: CohortCreationState = {
    count: 0,
    cohortSuccess: '',
    cohortError: ''
}

interface FetchDataPayload {
    file: FormData;
    name: string;
}


const CohortCreationReducer = createSlice({
    name: 'CohortCreationReducer',
    initialState: rawState,
    reducers: {
        createCohort: (state: any, action: PayloadAction<any>) => {
            return { ...state }
        },
        createCohortSuccess: (state: any, action: PayloadAction<FetchDataPayload>) => {
            return { ...state, cohortSuccess: action.payload }

        },
        createCohortError: (state: any, action: PayloadAction<FetchDataPayload>) => {
            return { ...state, cohortError: action.payload }
        },

        resetCohort: (state: any) => {
            return rawState
        }
    }
})

export const { createCohort, createCohortSuccess, createCohortError, resetCohort } = CohortCreationReducer.actions;

export default CohortCreationReducer;