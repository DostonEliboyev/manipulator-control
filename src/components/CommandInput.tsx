import { Button, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addCommandToHistory } from "../redux/commandSlice"
import { optimizeCommand } from "../utils/commandOptimizer"

type FormData = {
  command: string
}

export default function CommandInput({ onExecute }: { onExecute: (cmd: string) => void }) {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const dispatch = useDispatch()

  const onSubmit = (data: FormData) => {
    const optimized = optimizeCommand(data.command)
    dispatch(addCommandToHistory({ raw: data.command, optimized }))
    onExecute(optimized)
    reset()
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Komandani kiriting:</Typography>
      <TextField {...register("command")} placeholder="МММННПО..." fullWidth />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>Yuborish</Button>
    </Stack>
  )
}
