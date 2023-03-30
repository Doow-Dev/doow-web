import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import vitualAccountReducer from "../features/virtual-account/virtualAccountSlice";

const store = configureStore({
  reducer: {
    virtualAccountState: vitualAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store };
