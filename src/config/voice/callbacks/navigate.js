/**
 * Navegar entre pantallas, esto excluye los comandos que navegan en el sistema con propositos más específicos (click, press, etc)
 */

import router from 'next/router'

export const navigateCallbacks = {
  // Ir a la página
  go_to_home: () => {
    console.log('Irá al HOME')
    router.push(`${process.env.CCOMMERCE_BASE_URL}/`)
  },
  go_to_cart: () => {
    console.log('Irá al Carrito')
    router.push(`${process.env.CCOMMERCE_BASE_URL}/cart`)
  },
  go_to_back: () => {
    console.log('Retroceder')
    router.back()
  },
  go_to_login: () => {
    router.push(`${process.env.CCOMMERCE_BASE_URL}/login`)
  },
  go_to_register: () => {
    router.push(`${process.env.CCOMMERCE_BASE_URL}/register`)
  },
  go_to_help_me: () => {
    const helpNode = document.getElementById('ccommerce-help')
    if (helpNode) {
      helpNode.click()
    } else {
      notification.error({
        message: 'Error de interacción por voz',
        description: 'El elemento deseado no existe en la página actual',
      })
    }
  },
  exit_from_help_me: () => {
    const helpCloseNode =
      document.getElementsByClassName('ant-modal-close-x')[0]
    if (helpCloseNode) {
      helpCloseNode.click()
    } else {
      notification.error({
        message: 'Error de interacción por voz',
        description: 'El elemento deseado no existe en la página actual',
      })
    }
  },
  // Navegar en la página
  to_up: () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth',
    })
  },
  to_down: () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  },
  to_full_up: () => {
    window.scrollBy({
      top: -document.body.clientHeight,
      behavior: 'smooth',
    })
  },
  to_full_down: () => {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    })
  },
}
