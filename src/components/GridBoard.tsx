import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Snackbar } from "@mui/material"
const GRID_SIZE = 5

type Props = {
    command: string
    intervalDelay: number
}

type Cell = {
    hasSample: boolean
}

function generateSamplePositions(count: number): [number, number][] {
    const positions = new Set<string>()
    while (positions.size < count) {
        const x = Math.floor(Math.random() * GRID_SIZE)
        const y = Math.floor(Math.random() * GRID_SIZE)
        positions.add(`${x},${y}`)
    }
    return Array.from(positions).map(p => p.split(',').map(Number) as [number, number])
}

export default function GridBoard({ command, intervalDelay }: Props) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [hasSample, setHasSample] = useState(false)
    const [samples, setSamples] = useState<Cell[][]>([])
    const [history, setHistory] = useState<string[]>([])
    const [snackbar, setSnackbar] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
            Array.from({ length: GRID_SIZE }, () => ({ hasSample: false }))
        )

        generateSamplePositions(5).forEach(([x, y]) => {
            grid[y][x].hasSample = true
        })

        setSamples(grid)
    }, [])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i >= command.length) return clearInterval(interval)
            const move = command[i++]

            setX(prev => Math.max(0, Math.min(GRID_SIZE - 1, move === "П" ? prev + 1 : move === "Л" ? prev - 1 : prev)))
            setY(prev => Math.max(0, Math.min(GRID_SIZE - 1, move === "Н" ? prev + 1 : move === "В" ? prev - 1 : prev)))

            if (move === "О") {
                setSamples(prev => {
                    const copy = prev.map(row => row.map(cell => ({ ...cell })))
                    if (copy[y][x].hasSample && !hasSample) {
                        copy[y][x].hasSample = false
                        setHasSample(true)
                    }
                    return copy
                })
            }

            if (move === "Б") {
                setSamples(prev => {
                    const copy = prev.map(row => row.map(cell => ({ ...cell })))
                    if (!copy[y][x].hasSample && hasSample) {
                        copy[y][x].hasSample = true
                        setHasSample(false)
                    }
                    return copy
                })
            }
        }, intervalDelay)

        return () => clearInterval(interval)
    }, [command, intervalDelay])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i >= command.length) return clearInterval(interval)
            const move = command[i++]

            setX(prev => {
                const newX = Math.max(0, Math.min(GRID_SIZE - 1, move === "П" ? prev + 1 : move === "Л" ? prev - 1 : prev))
                if (newX !== prev) addToHistory(`X o‘zgardi: ${prev} → ${newX}`)
                return newX
            })

            setY(prev => {
                const newY = Math.max(0, Math.min(GRID_SIZE - 1, move === "Н" ? prev + 1 : move === "В" ? prev - 1 : prev))
                if (newY !== prev) addToHistory(`Y o‘zgardi: ${prev} → ${newY}`)
                return newY
            })

            if (move === "О") {
                setSamples(prev => {
                    const copy = prev.map(row => row.map(cell => ({ ...cell })))
                    if (copy[y][x].hasSample && !hasSample) {
                        copy[y][x].hasSample = false
                        setHasSample(true)
                        addToHistory(`Sample OLINDI (${x}, ${y})`)
                    }
                    return copy
                })
            }

            if (move === "Б") {
                setSamples(prev => {
                    const copy = prev.map(row => row.map(cell => ({ ...cell })))
                    if (!copy[y][x].hasSample && hasSample) {
                        copy[y][x].hasSample = true
                        setHasSample(false)
                        addToHistory(`Sample QO‘YILDI (${x}, ${y})`)
                    }
                    return copy
                })
            }

        }, intervalDelay)

        return () => clearInterval(interval)
    }, [command, intervalDelay])

    function addToHistory(entry: string) {
        setHistory(prev => [...prev, `${entry}`])
    }
    function showSnackbar(msg: string) {
        setSnackbar(msg)
        setOpen(true)
    }

    // if (copy[y][x].hasSample && !hasSample) {
    //     showSnackbar(`✅ Sample OLINDI (${x}, ${y})`)
    //   }
      
      
    //   if (!copy[y][x].hasSample && hasSample) {
    //     showSnackbar(`📦 Sample QO‘YILDI (${x}, ${y})`)
    //   }
    return (
        <div>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`, gap: 1, mt: 4 }}>
                {samples.flatMap((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isActive = x === colIndex && y === rowIndex
                        return (
                            <Box key={`${rowIndex}-${colIndex}`}
                                sx={{
                                    width: 60, height: 60,
                                    border: "1px solid gray",
                                    backgroundColor: isActive ? "skyblue"
                                        : cell.hasSample ? "lightgreen"
                                            : "white",
                                }}
                            />
                        )
                    })
                )}
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">📜 Harakatlar tarixi:</Typography>
                <Box sx={{ maxHeight: 200, overflowY: "auto", p: 1, border: "1px solid lightgray", borderRadius: 1 }}>
                    {history.map((item, index) => (
                        <Typography key={index} variant="body2">{index + 1}. {item}</Typography>
                    ))}
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={snackbar}
            />

        </div>

    )
}
