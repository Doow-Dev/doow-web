import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface InitialStateTypes {
  waitList: {
    email: string
    isModalOpen: boolean
    name: string
    company: string
    role: string
  },
}

const initialState: InitialStateTypes = {
  waitList: {
    email: "",
    isModalOpen: false,
    name: "",
    company: "",
    role: "",
  },
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.waitList.email = action.payload
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.waitList.isModalOpen = action.payload
    },
    updateForm: (state, action: PayloadAction<Partial<InitialStateTypes["waitList"]>>) => {
      state.waitList = { ...state.waitList, ...action.payload }
    },
    resetForm: () => {
      return initialState
    },
  },
})

export const { setEmail, setModalOpen, updateForm, resetForm } = globalSlice.actions;
export default globalSlice.reducer