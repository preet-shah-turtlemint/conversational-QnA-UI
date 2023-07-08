import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import CohortCreationReducer from './views/cohort-creation/reducer';
import { Epic } from 'redux-observable';
import CohortSummaryReducer from './views/cohort-summary/reducer';
import BotChatReducer from './views/bot/reducer';

const rootReducer = combineReducers({
  // Add your reducers here
  CohortCreationReducer: CohortCreationReducer.reducer,
  CohortSummaryReducer: CohortSummaryReducer.reducer,
  BotChatReducer: BotChatReducer.reducer
  
});



export default rootReducer;

export type MyState = ReturnType<typeof rootReducer>;
export type MyEpic = Epic<AnyAction, AnyAction, MyState>;
