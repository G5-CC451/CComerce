import { searchCallbacks } from './search'
import { navigateCallbacks } from './navigate'
import { buyCallbacks } from './buy'
import { adminCallbacks } from './admin'
import { settingCallbacks } from './setting'

export const allCallbacks = {
  ...searchCallbacks,
  ...navigateCallbacks,
  ...buyCallbacks,
  ...adminCallbacks,
  ...settingCallbacks,
}
