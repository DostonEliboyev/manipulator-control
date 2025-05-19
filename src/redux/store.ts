import { configureStore } from '@reduxjs/toolkit'
import commandReducer from './commandSlice'
import manipulatorSlice from './manipulatorSlice'

export const store = configureStore({
  reducer: {
    commands: commandReducer,
    manipulator: manipulatorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
