import { mockAllCommands } from "./commands";
import { mockAllCallbacks } from "./callbacks";

const allVoiceCommands = Object.entries(mockAllCommands).map(
  ([mockCallbackName, mockCommand]) => {
    return {
      command: mockCommand,
      callback: mockAllCallbacks[mockCallbackName],
    };
  }
);

export { allVoiceCommands };
