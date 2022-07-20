/**
 * Compra de producto y gestión del carrito de compras
 */

import { getSimilars } from '../helpers/matchString'

// Para seleccionar producto
export const select_to_product = getSimilars(['seleccionar * *'])

// Para agregar un producto a carrito
export const add_to_cart = getSimilars([
  'agrega a carrito',
  'agregar a carrito',
  'agrega a carrito de compras',
  'agregar a carrito de compras',
  'agrega al carrito',
  'agregar al carrito',
  'agrega al carrito de compras',
  'agregar al carrito de compras',
  'agrega este producto al carrito',
  'agregar este producto al carrito',
  'agrega el * al carrito',
  'agrega la * al carrito',
  'agrega * * a carrito',
  'agregar * * a carrito',
  'agrega * * a carrito de compras',
  'agregar * * a carrito de compras',
  'agrega * * al carrito',
  'agregar * * al carrito',
  'agrega * * al carrito de compras',
  'agregar * * al carrito de compras',
])

// Para aumentar los productos del carrito
export const increase_quantity_product = getSimilars([
  'agrega cantidad del producto',
  'uno más',
  'dale otro más',
])

// Para aumentar los productos del carrito
export const decrease_quantity_product = getSimilars([
  'quita cantidad del producto',
  'uno menos',
  'dale otro menos',
])

// Para comprar un producto
export const buy_product = getSimilars([
  'compra el siguiente producto',
  'compra el producto',
  'comprar el producto',
  'compra ahora',
  'comprar ahora',
  'cómprame el producto',
  'compra el *',
  'cómprame el *',
])
