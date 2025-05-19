import React from "react"
import { useForm } from "react-hook-form"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import {
  executeCommand,
  optimizeCommand,
  reset,
  saveLastCommand,
} from "../redux/manipulatorSlice"

type FormValues = {
  command: string
}

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormValues>()

  const lastOptimizedCommand = useSelector(
    (state: RootState) => state.manipulator.lastOptimizedCommand
  )

  const onSubmit = (data: FormValues) => {
    const raw = data.command.toUpperCase().replace(/[^ЛПВНOБ]/g, "")
    const optimized = optimizeCommand(raw)
    dispatch(saveLastCommand(optimized))
    dispatch(executeCommand(optimized))
    resetForm()
  }

  const handleReset = () => {
    dispatch(reset())
  }

  const handleReplay = () => {
    dispatch(reset())
    setTimeout(() => {
      dispatch(executeCommand(lastOptimizedCommand))
    }, 300)
  }

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Komanda boshqaruvi
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="column">
          <TextField
            label="Komanda (masalan: ЛЛЛНННО)"
            {...register("command", {
              required: "Komanda kiritilishi kerak",
              pattern: {
                value: /^[ЛПВНОБлпвноб]+$/,
                message: "Faqat ЛПВНОБ harflaridan foydalaning",
              },
            })}
            error={!!errors.command}
            helperText={errors.command?.message}
            autoComplete="off"
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              🚀 Yuborish
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              ♻️ Reset
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReplay}
              disabled={!lastOptimizedCommand}
            >
              🔁 Replay
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default ControlPanel
