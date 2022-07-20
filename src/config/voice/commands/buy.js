/**
 * Compra de producto y gestión del carrito de compras
 */

// Para seleccionar producto
export const select_to_product = getSimilars([
  'quiero el producto seleccionado'
])

// Para agregar un producto a carrito
export const add_to_cart = getSimilars([
  'agrega este producto al carrito',
  'agregar este producto al carrito',
  'agrega el * al carrito',
  'agrega la * al carrito',
])

// Para aumentar los productos del carrito
export const add_quantity_produtc_to_cart = getSimilars([
  'agregar cantidad del producto *'
])

// Para comprar un producto
//
export const buy_product = getSimilars([
  'compra el siguiente producto',
  'compra el producto',
  'cómprame el producto',
  'compra el *',
  'cómprame el *',
])
