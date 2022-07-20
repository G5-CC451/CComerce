/**
 * Gestión de todos los flujos en /admin/*
 */

export const adminCallbacks = {
  // Insertar
  insert_category_name: () => {
    const inputCategoryName = document.querySelector('input#category-name')
    console.log('inputCategoryName', inputCategoryName)
    inputCategoryName.focus()
  },
}
