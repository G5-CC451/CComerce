import router from "next/router";

const CCOMMERCE_BASE_URL = "http://localhost:3000";

export const mockAllCallbacks = {
  search_product: () => {
    console.log("search_product");
  },
  select_to_product: () => {
    console.log("select_to_product");
  },
  search_category: () => {
    console.log("search_category");
  },
  add_to_cart: () => {
    console.log("add_to_cart");
  },
  add_quantity_produtc_to_cart: () => {
    console.log("add_quantity_produtc_to_cart");
  },
  buy_product: () => {
    console.log("buy_product");
  },
  // Interacción con libreria
  reset_voice_recognition: () => {
    handleReset();
  },
  shutdown_voice_recognition: () => {
    stopHandle();
  },
  // Ir a la vista
  go_to_cart: () => {
    console.log("Irá al Carrito");
    router.push(`${CCOMMERCE_BASE_URL}/cart`);
  },
  go_to_home: () => {
    console.log("Irá al HOME");
    router.push(`${CCOMMERCE_BASE_URL}/`);
  },
  go_to_create_category: () => {
    router.push(`${CCOMMERCE_BASE_URL}/admin/category`);
  },
  // Navegar en la vista
  to_up: () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    });
  },
  to_down: () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  },
  to_full_up: () => {
    window.scrollBy({
      top: -document.body.clientHeight,
      behavior: "smooth",
    });
  },
  to_full_down: () => {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: "smooth",
    });
  },
  // Insertar
  insert_category_name: () => {
    const inputCategoryName = document.querySelector("input#category-name");
    console.log("inputCategoryName", inputCategoryName);
    inputCategoryName.focus();
  },
  // Click, DoubleClick, Anti-click
  on_click: () => {
    console.log("element", element);
    element = element.toLowerCase().replace(" ", "-");
    console.log("elementKebab", element);
    const domNode = document.getElementById(element);
    domNode.click();
  },
};
