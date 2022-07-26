/**
 * Navegar entre pantallas, esto excluye los comandos que navegan en el sistema con propositos más específicos (click, press, etc)
 */

import { getSimilars } from '../helpers/matchString'

// Ir a la página '/'
export const go_to_home = getSimilars([
  'ir al inicio',
  'ir a inicio',
  'ir a página inicial',
  'ir a la página inicial',
  'ir a la página de inicio',
  'quiero ver categorías',
  'quiero ver ofertas',
  'quiero ver recomendaciones',
  'ver categorías',
  'ver ofertas',
  'ver recomendaciones',
])

// Retroceder
export const go_to_back = getSimilars([
  'retroceder',
  'retrocede',
  'atrás',
  'regresar',
])

// Ir a la página '/cart'
export const go_to_cart = getSimilars([
  'ir a carrito',
  'ir al carrito',
  'ir a carrito de compras',
  'ir al carrito de compras',
])

// Ir a la página '/login'
export const go_to_login = getSimilars([
  'ir a iniciar sesión',
  'ir al login',
  'ir a login',
  'autenticarse',
  'iniciar sesión',
])

// Ir a la página '/register'
export const go_to_register = getSimilars([
  'ir a registro',
  'ir al registro',
  'ir a registrarse',
  'ir a crear cuenta',
])

export const go_to_help_me = getSimilars([
  'por favor ayuda',
  'por favor ayudame',
  'por favor guíame',
  'ayuda',
  'ayúdame',
  'guíame',
  'ver ayuda',
  'ver guía',
])

export const exit_from_help_me = getSimilars([
  'salir de la ayuda',
  'salir de la guía',
  'salir de ayuda',
  'salir de guía',
])

// Navegar en la vista
export const to_up = getSimilars(['subir'])
export const to_down = getSimilars(['bajar'])
export const to_full_up = getSimilars(['subir todo'])
export const to_full_down = getSimilars(['bajar todo'])
