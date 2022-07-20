/**
 * Compra de producto y gestión del carrito de compras
 */

import { notification } from 'antd'
import router from 'next/router'

export const buyCallbacks = {
  select_to_product: (type, number) => {
    console.log('select_to_product', { type: type, number: number })
    if (router.pathname === '/') {
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
    }

    if (router.pathname === '/shop') {
      console.log('se rompre')
    }
  },
  view_to_product: (number) => {
    console.log('view_to_product', number)
    if (router.pathname === '/shop') {
      console.log('\n\n\n')
      console.log('ENTRO EN SHOP')
      const product = document.getElementById(`compra-${number}`)
      if (product) {
        const slug = product.dataset.slug
        router.push(`${process.env.CCOMMERCE_BASE_URL}/product/${slug}`)
      } else {
        notification.error({
          message: 'Error de interacción por voz',
          description: 'El elemento deseado no existe en la página actual',
        })
      }
    } else {
      console.log('Mala pronunciación de comandos')
    }
  },
  add_to_cart: (type, number) => {
    console.log('add_to_cart', type, number)
    if (router.pathname === '/') {
      // Comandos solo obedecerán si la página actual es el home ("/")
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
    }

    if (router.pathname === '/product/[slug]') {
      if (type.command) {
        const btnCart = document.getElementById('add-to-cart-product')
        if (btnCart) {
          btnCart.click()
        } else {
          notification.error({
            message: 'Error de interacción por voz',
            description: 'El elemento deseado no existe en la página actual',
          })
        }
      } else {
        console.log('Mala pronunciación de comandos')
      }
    }

    if (router.pathname === '/shop') {
      console.log('\n\n\n')
      console.log(
        'SHOP',
        type,
        number,
        parseInt(type),
        Number.isInteger(parseInt(type))
      )
      let productNumber = 0
      if (number.command && Number.isInteger(parseInt(type))) {
        productNumber = parseInt(type)
      } else {
        productNumber = parseInt(number)
      }
      console.log('ENTRO EN SHOP', productNumber)

      const btnCart = document.querySelector(
        `#compra-${productNumber} > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(2)`
      )
      console.log('SHOP.btnCart', btnCart)
      if (btnCart) {
        btnCart.click()
      } else {
        notification.error({
          message: 'Error de interacción por voz',
          description: 'El elemento deseado no existe en la página actual',
        })
      }
    } else {
      console.log('Mala pronunciación de comandos')
    }
  },
  increase_quantity_product: () => {
    console.log('increase_quantity_product')

    if (router.pathname === '/product/[slug]') {
      const btnQtyIncrease = document.getElementById('productQtyIncrease')
      if (btnQtyIncrease) {
        btnQtyIncrease.click()
      } else {
        notification.error({
          message: 'Error de interacción por voz',
          description: 'El elemento deseado no existe en la página actual',
        })
      }
    }
  },
  decrease_quantity_product: () => {
    console.log('decrease_quantity_product')

    if (router.pathname === '/product/[slug]') {
      const btnQtyDecrease = document.getElementById('productQtyDecrease')
      if (btnQtyDecrease) {
        btnQtyDecrease.click()
      } else {
        notification.error({
          message: 'Error de interacción por voz',
          description: 'El elemento deseado no existe en la página actual',
        })
      }
    }
  },
  buy_product: () => {
    console.log('buy_product')
    if (router.pathname === '/product/[slug]') {
      const btnBuy = document.getElementById('buy-to-cart-product')
      if (btnBuy) {
        btnBuy.click()
      } else {
        notification.error({
          message: 'Error de interacción por voz',
          description: 'El elemento deseado no existe en la página actual',
        })
      }
    } else {
      console.log('Mala pronunciación de comandos')
    }
  },
}
