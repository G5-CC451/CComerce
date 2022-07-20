/**
 * Gestión de todos los flujos en /admin/*
 */

export const adminCallbacks = {
  // Ir a crear nueva categoría
  go_to_create_category: () => {
    router.push(`${process.env.CCOMMERCE_BASE_URL}/admin/category`)
  },
  // Insertar una nueva categoría
  insert_category_name: () => {
    const inputCategoryName = document.querySelector('input#category-name')
    console.log('inputCategoryName', inputCategoryName)
    inputCategoryName.focus()
  },
}
