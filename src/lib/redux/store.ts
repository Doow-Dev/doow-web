import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import globalReducer from "../redux"



/* REDUX STORE */
const rootReducer = combineReducers({
    global: globalReducer,
})
export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

/* REDUX TYPES */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

