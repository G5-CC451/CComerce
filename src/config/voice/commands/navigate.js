/**
 * Navegar entre pantallas, esto excluye los comandos que navegan en el sistema con propositos más específicos (click, press, etc)
 */

import { getSimilars } from '../helpers/matchString'

// Ir a la página '/'
export const go_to_home = [
  'ir al inicio',
  'ir a inicio',
  'Ir a inicio.',
  'Ir al inicio',
  'Ir al inicio.',
  'Ir a inicio.',
  'ir a página inicial',
  'ir a página inicial.',
  'Ir a página inicial',
  'Ir a página inicial.',
  'ir a la página inicial',
  'ir a la página inicial.',
  'Ir a la página inicial',
  'Ir a la página inicial.',
  'ir a la página de inicio',
  'ir a la página de inicio.',
  'Ir a la página de inicio',
  'Ir a la página de inicio.',
  'Quiero ver categorías.',
  'Quiero ver ofertas.',
  'Quiero ver recomendaciones.',
  'Quiero ver todas las categorías.',
  'Quiero ver todas las ofertas.',
  'Quiero ver todas las recomendaciones.',
  'Ver todas las ofertas.',
  'Ver todas las categorías.',
  'Ver todas las recomendaciones.',

  'Quiero ver categorías',
  'Quiero ver ofertas',
  'Quiero ver recomendaciones',
  'Quiero ver todas las categorías',
  'Quiero ver todas las ofertas',
  'Quiero ver todas las recomendaciones',
  'Ver todas las ofertas',
  'Ver todas las categorías',
  'Ver todas las recomendaciones',
]

// Ir a la página '/cart'
export const go_to_cart = [
  'ir a carrito',
  'Ir a carrito',
  'Ir a carrito.',

  'ir al carrito',
  'Ir al carrito',
  'Ir al carrito.',

  'ir a carrito de compras',
  'Ir a carrito de compras',
  'Ir a carrito de compras.',

  'ir al carrito de compras',
  'Ir al carrito de compras',
  'Ir al carrito de compras.',

  'regresar al carrito de compras',
  'Regresar al carrito de compras',
  'Regresar al carrito de compras.',

  'regresar a carrito de compras',
  'Regresar a carrito de compras',
  'Regresar a carrito de compras.',
]

// Ir a la página '/login'
export const go_to_login = [
  'ir a iniciar sesión',
  'Ir a iniciar sesión',
  'Ir a iniciar sesión.',

  'ir al login',
  'Ir al login',
  'Ir al login.',

  'ir a login',
  'Ir a login',
  'Ir a login.',

  'ir a conectarse',
  'Ir a conectarse',
  'Ir a conectarse.',
]

// Ir a la página '/register'
export const go_to_register = [
  'ir a registro',
  'Ir a registro',
  'Ir a registro.',

  'ir al registro',
  'Ir al registro',
  'Ir al registro.',

  'ir a registrarse',
  'Ir a registrarse',
  'Ir a registrarse.',

  'ir a crear cuenta',
  'Ir a crear cuenta',
  'Ir a crear cuenta.',
]

// Navegar en la vista
export const to_up = getSimilars(['subir'])
export const to_down = ['bajar', 'Bajar', 'Bajar.']
export const to_full_up = ['subir todo', 'Subir todo', 'Subir todo.']
export const to_full_down = ['bajar todo', 'Bajar todo', 'Bajar todo.']
