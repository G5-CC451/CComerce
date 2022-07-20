export function getSimilars(commands) {
  // 'commands' debe ser un comando con solo minúsculas y sin punto final
  const commandsUpper = commands.map(
    (command) => command[0].toUpperCase() + command.slice(1)
  )

  const commandsUpperWithDot = commandsUpper.map((command) => `${command}.`)

  return [...commands, ...commandsUpper, ...commandsUpperWithDot]
}
