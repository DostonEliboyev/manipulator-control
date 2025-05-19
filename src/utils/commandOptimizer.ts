export function optimizeCommand(cmd: string): string {
    if (!cmd) return ""
  
    // Oddiy siqish: LLLLVVPP -> 4L2V2P
    let result = ""
    let count = 1
  
    for (let i = 1; i <= cmd.length; i++) {
      if (cmd[i] === cmd[i - 1]) {
        count++
      } else {
        result += (count > 1 ? count : "") + cmd[i - 1]
        count = 1
      }
    }
  
    return result
  }
  