import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { CohortCreationState } from "./reducer";


const reducer = 'CohortCreationReducer';
const createCohort = (state: CohortCreationState) => state;

const CohortCreationSelector = createDraftSafeSelector(createCohort, (state: any) => state[reducer])

export default CohortCreationSelector;