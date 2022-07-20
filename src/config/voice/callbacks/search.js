/**
 * Búsqueda de productos
 */

export const searchCallbacks = {
  search_product: () => {
    console.log('search_product')
  },
  search_by_category_selected: (number) => {
    const categoryNode = document.getElementById(`category-selector-${number}`)
    // if (categoryNode) {
    console.log('categoryNode', categoryNode)
    categoryNode.click()
    // } else {
    // notification.error({
    // message: 'Error de interacción por voz',
    // description: 'El elemento deseado no existe en la página actual',
    // })
    // }
  },
}
