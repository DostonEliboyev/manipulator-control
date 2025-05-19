import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type Cell = {
  hasSample: boolean
  hasManipulator: boolean
}

export type ManipulatorState = {
  x: number
  y: number
  grid: Cell[][]
  hasSample: boolean
  originalGrid: Cell[][]
  lastOptimizedCommand: string
}

// Grid o'lchami
const ROWS = 5
const COLS = 5

function createEmptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      hasSample: false,
      hasManipulator: false,
    }))
  )
}

function generateRandomSamples(grid: Cell[][], count = 3): Cell[][] {
  const copy = JSON.parse(JSON.stringify(grid)) as Cell[][]
  let placed = 0
  while (placed < count) {
    const x = Math.floor(Math.random() * ROWS)
    const y = Math.floor(Math.random() * COLS)
    if (!copy[x][y].hasSample && (x !== 0 || y !== 0)) {
      copy[x][y].hasSample = true
      placed++
    }
  }
  return copy
}

const initialGrid = generateRandomSamples(createEmptyGrid())

const initialState: ManipulatorState = {
  x: 0,
  y: 0,
  grid: JSON.parse(JSON.stringify(initialGrid)),
  hasSample: false,
  originalGrid: initialGrid,
  lastOptimizedCommand: "",
}

export const manipulatorSlice = createSlice({
  name: "manipulator",
  initialState,
  reducers: {
    reset: (state) => {
      state.x = 0
      state.y = 0
      state.hasSample = false
      state.grid = JSON.parse(JSON.stringify(state.originalGrid))
    },
    saveLastCommand: (state, action: PayloadAction<string>) => {
      state.lastOptimizedCommand = action.payload
    },
    executeCommand: (state, action: PayloadAction<string>) => {
      const commands = action.payload.split("")
      for (const cmd of commands) {
        switch (cmd) {
          case "Л":
            if (state.y > 0) state.y--
            break
          case "П":
            if (state.y < COLS - 1) state.y++
            break
          case "В":
            if (state.x > 0) state.x--
            break
          case "Н":
            if (state.x < ROWS - 1) state.x++
            break
          case "О":
            if (state.grid[state.x][state.y].hasSample && !state.hasSample) {
              state.grid[state.x][state.y].hasSample = false
              state.hasSample = true
            }
            break
          case "Б":
            if (!state.grid[state.x][state.y].hasSample && state.hasSample) {
              state.grid[state.x][state.y].hasSample = true
              state.hasSample = false
            }
            break
        }
      }
    },
  },
})

// Komandani optimallashtirish funksiyasi
export function optimizeCommand(input: string): string {
  if (!input) return ""
  let result = ""
  let count = 1
  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++
    } else {
      result += (count > 1 ? count : "") + input[i - 1]
      count = 1
    }
  }
  return result
}

export const { reset, executeCommand, saveLastCommand } = manipulatorSlice.actions
export default manipulatorSlice.reducer
