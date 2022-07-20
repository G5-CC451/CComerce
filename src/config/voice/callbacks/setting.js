/**
 * Gestión de la libreria, tales como habilitación o deshabilitación de reconocimiento de voz.
 */

export const settingCallbacks = {
  // Interacción con libreria
  reset_voice_recognition: () => {
    handleReset()
  },
  shutdown_voice_recognition: () => {
    stopHandle()
  },
  // Click, DoubleClick, Anti-click
  on_click: () => {
    console.log('element', element)
    element = element.toLowerCase().replace(' ', '-')
    console.log('elementKebab', element)
    const domNode = document.getElementById(element)
    domNode.click()
  },
}
