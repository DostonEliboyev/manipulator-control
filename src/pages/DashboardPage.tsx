import { useState } from "react"
import { Container, Slider, Typography } from "@mui/material"
import CommandInput from "../components/CommandInput"
import GridBoard from "../components/GridBoard"

export default function DashboardPage() {
  const [activeCommand, setActiveCommand] = useState("")
  const [delay, setDelay] = useState(500)

  return (
    <Container sx={{ mt: 4 }}>
      <CommandInput onExecute={setActiveCommand} />

      <Typography mt={4}>Tezlik (ms): {delay}</Typography>
      <Slider
        value={delay}
        min={100}
        max={1500}
        step={100}
        onChange={(_, value) => setDelay(value as number)}
      />

      <GridBoard command={activeCommand} intervalDelay={delay} />
    </Container>
  )
}
