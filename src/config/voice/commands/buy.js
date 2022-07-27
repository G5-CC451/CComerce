/**
 * Compra de producto y gestión del carrito de compras
 */

import { getSimilars } from '../helpers/matchString'

// Para seleccionar producto
export const select_to_product = getSimilars([
  'click en * *',
  'seleccionar * *',
  'mostrar * *',
  'click * *',
])

export const view_to_product = getSimilars([
  'ver el producto número * ',
  'ver el producto * ',
  'ver producto número * ',
  'ver producto * ',
  'ver *',
])

// Para agregar un producto a carrito
export const add_to_cart = getSimilars([
  'añadir al carrito',
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
  'añadir * * al carrito',
  'agrega * * al carrito de compras',
  'agregar * * al carrito de compras',
])

// Para aumentar los productos del carrito
export const increase_quantity_product = getSimilars([
  'agrega cantidad del producto',
  'uno más',
  'agrega uno más',
  'agrega 1 más',
  'añade 1 más',
  'añade uno más',
  '1 más',
  'dale otro más',
])

export const increase_quantity_product_selected = getSimilars([
  'agrega cantidad del producto número *',
  'agrega cantidad de producto número *',
  'agrega cantidad del producto *',
  'agrega cantidad de producto *',
  'agregar cantidad del producto número *',
  'agregar cantidad de producto número *',
  'agregar cantidad del producto *',
  'agregar cantidad de producto *',
  'aumenta cantidad del producto *',
  'aumenta cantidad de producto *',
  'aumentar cantidad del producto *',
  'aumentar cantidad de producto *',
  'uno más del producto número *',
  'uno más de producto número *',
  'uno más del producto *',
  'uno más de producto *',
  'uno más de *',
  'agrega uno más de *',
  'agrega 1 más',
  'añade 1 más',
  'añade uno más',
  '1 más',
  'dale otro más',
])

// Para aumentar los productos del carrito
export const decrease_quantity_product = getSimilars([
  'quita cantidad del producto',
  'quita 1',
  'quita uno',
  'uno menos',
  '1 menos',
  'dale otro menos',
])

export const decrease_quantity_product_selected = getSimilars([
  'quita cantidad del producto número *',
  'quita cantidad de producto número *',
  'quita cantidad del producto *',
  'quita cantidad de producto *',
  'quitar cantidad del producto número *',
  'quitar cantidad de producto número *',
  'quitar cantidad del producto *',
  'quitar cantidad de producto *',
  'disminuye cantidad del producto *',
  'disminuye cantidad de producto *',
  'disminuir cantidad del producto *',
  'disminuir cantidad de producto *',
  'uno menos del producto número *',
  'uno menos de producto número *',
  'uno menos del producto *',
  'uno menos de producto *',
  'uno menos de *',
  'quita uno más de *',
  'quita 1 más de *',
  'remueve 1 más de *',
  'remueve uno más de *',
  '1 menos de *',
  'dale otro menos de *',
])

// Para comprar un producto
export const buy_product = getSimilars([
  'compra el siguiente producto',
  'comprar producto',
  'compra el producto',
  'comprar el producto',
  'compra ahora',
  'comprar ahora',
  'cómprame el producto',
  'compra el *',
  'cómprame el *',
])

export const buy_product_in_cart = getSimilars([
  'pagar',
  'pagar carrito',
  'quiero pagar',
])

export const buy_products_in_checkout = getSimilars([
  'efectuar orden',
  'efectuar pedido',
  'efectuar pedidos',
  'efectuar pago',
])
