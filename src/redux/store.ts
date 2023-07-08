import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Epic, createEpicMiddleware } from 'redux-observable';
import rootReducer from '../root-reducer';
import rootEpic from '../root-epic';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [ ...getDefaultMiddleware({ thunk: false, serializableCheck: false }), epicMiddleware],
});

epicMiddleware.run(rootEpic as Epic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
