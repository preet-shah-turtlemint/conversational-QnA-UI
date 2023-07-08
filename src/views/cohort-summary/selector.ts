import { createDraftSafeSelector } from "@reduxjs/toolkit";


const reducer = 'CohortSummaryReducer';
const cohortSummary = (state: any) => state;

const CohortSummarySelector = createDraftSafeSelector(cohortSummary, (state: any) => state[reducer])

export default CohortSummarySelector;