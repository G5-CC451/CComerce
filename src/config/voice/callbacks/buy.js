/**
 * Compra de producto y gestión del carrito de compras
 */

import { notification } from 'antd'
import router from 'next/router'

export const buyCallbacks = {
  select_to_product: (type, number) => {
    console.log('select_to_product', type, number)
    const product = document.getElementById(`${type}-${number}`)
    if (product) {
      const slug = product.dataset.slug
      router.push(`${process.env.CCOMMERCE_BASE_URL}/product/${slug}`)
    } else {
      notification.error({
        message: 'Error de interacción por voz',
        description: 'El elemento deseado no existe en la página actual',
      })
    }
  },
  add_to_cart: (type, number) => {
    console.log('add_to_cart', type, number)
    const btnCart = document.querySelector(
      `#${type}-${number} > div:nth-child(2) > div > div > div:nth-child(2) > div.handleAddToCart`
    )
    if (btnCart) {
      btnCart.click()
    } else {
      notification.error({
        message: 'Error de interacción por voz',
        description: 'El elemento deseado no existe en la página actual',
      })
    }
  },
  add_quantity_produtc_to_cart: () => {
    console.log('add_quantity_produtc_to_cart')
  },
  buy_product: () => {
    console.log('buy_product')
  },
}
