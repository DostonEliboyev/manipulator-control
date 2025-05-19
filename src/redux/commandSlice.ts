import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CommandState {
  history: string[]
  lastOptimizedCommand?: string
  x: number
  y: number
  hasSample: boolean
  grid: any[][]
  originalGrid: any[][]
}

const initialState: CommandState = {
  history: [],
  lastOptimizedCommand: undefined,
  x: 0,
  y: 0,
  hasSample: false,
  grid: [],
  originalGrid: []
}

const commandSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {
    addCommandToHistory(state, action) {
      state.history.push(action.payload)
    },
    reset: (state) => {
      state.x = 0
      state.y = 0
      state.hasSample = false
      state.grid = JSON.parse(JSON.stringify(state.originalGrid))
    },

    saveLastCommand: (state, action: PayloadAction<string>) => {
      state.lastOptimizedCommand = action.payload
    },

    replay: (state) => {
      // Bunday qilib qilishdan ko‘ra, aslida bu funksiyani thunk orqali dispatch qilamiz
      // Chunki animatsiya va step-by-step bajarilishi kerak bo‘ladi
    }

  },

})

export const { addCommandToHistory } = commandSlice.actions
export default commandSlice.reducer
