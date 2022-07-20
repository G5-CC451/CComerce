import { allCommands } from './commands'
import { allCallbacks } from './callbacks'

const allVoiceCommands = Object.entries(allCommands).map(
  ([callbackName, command]) => {
    return {
      command: command,
      callback: allCallbacks[callbackName],
    }
  }
)

export { allVoiceCommands }
