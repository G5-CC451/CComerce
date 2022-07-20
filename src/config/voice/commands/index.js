import * as searchCommands from './search'
import * as navigateCommands from './navigate'
import * as buyCommands from './buy'
import * as adminCommands from './admin'
import * as settingCommands from './setting'

export const allCommands = {
  ...searchCommands,
  ...navigateCommands,
  ...buyCommands,
  ...adminCommands,
  ...settingCommands,
}
