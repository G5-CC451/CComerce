/**
 * Gestión de la libreria, tales como habilitación o deshabilitación de reconocimiento de voz.
 */

import { getSimilars } from "../helpers/matchString"

// Interacción con libreria
export const reset_voice_recognition = getSimilars(['resetear'])
export const shutdown_voice_recognition = getSimilars([
  'chau',
  'chao',
  'sayonara',
  'bye bye',
])

// Click, DoubleClick, Anti-click
export const on_click = getSimilars(['clic en *'])
