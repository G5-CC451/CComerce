// Del usuario para buscar un producto
const search_product = [
  "Quiero un *",
  "Quiero una *",
  "Quiero buscar un *",
  "Quiero buscar una *",
  "Quiero que busques un *",
  "Quiero que busques una *",
  "Búscame un *",
  "Búscame una *",
  "Encuentra un *",
  "Encuentra una *",
  "Quiero comprar un *",
  "Quiero comprar una *",
  "Podrías buscar un *",
  "Podrías buscar una *",
  "Buscar *",
  "Busca un *",
  "Busca una *",
  "Busca la *",
  "Busca el *",
  "Deseo una *",
  "Deseo un *",
  "Deseo buscar un *",
  "Deseo buscar una *",
  "Deseo que busques un *",
  "Deseo que busques una *",
  "Por favor quiero un *",
  "Por favor quiero una *",
  "Por favor quiero buscar un *",
  "Por favor quiero buscar una *",
  "Por favor quiero que busques un *",
  "Por favor quiero que busques una *",
  "Por favor búscame un *",
  "Por favor búscame una *",
  "Por favor encuentra un *",
  "Por favor encuentra una *",
  "Por favor quiero comprar un *",
  "Por favor quiero comprar una *",
  "Por favor podrías buscar un *",
  "Por favor podrías buscar una *",
  "Por favor busca un *",
  "Por favor busca una *",
  "Por favor busca la *",
  "Por favor busca el *",
  "Por favor deseo una *",
  "Por favor deseo un *",
  "Por favor deseo buscar un *",
  "Por favor deseo buscar una *",
  "Por favor deseo que busques un *",
  "Por favor deseo que busques una *",
];
// Luego de buscar el producto te mostrará una interfaz con todas las coincidencias y con el seleccionador en el primer producto, osea el de la izquierda superior.

// Para seleccionar producto
const select_to_product = ["Quiero el producto seleccionado"];

// Pel usuario para buscar categoría
const search_category = ["Llévame a la categoría *", "Quiero comprar *"];

// Para agregar un producto a carrito
const add_to_cart = [
  "Agrega este producto al carrito",
  "Agregar este producto al carrito",
  "Agrega el * al carrito",
  "Agrega la * al carrito",
];

// Para aumentar los productos del carrito
const add_quantity_produtc_to_cart = ["agregar cantidad del producto *"];

// Para comprar un producto
const buy_product = [
  "Compra el siguiente producto",
  "Compra el producto",
  "Cómprame el producto",
  "Compra el *",
  "Cómprame el *",
];

// Interacción con libreria
const reset_voice_recognition = ["resetear", "Resetear", "Resetear." ];
const shutdown_voice_recognition = ["chau", "chao", "sayonara", "bye bye", "Chau", "Chao", "Sayonara", "Bye bye", "Chau.", "Chao.", "Sayonara.", "Bye bye."];

// Ir a la vista
const go_to_cart = ["ir al carrito", "ir a carrito", "Ir a carrito.", "Ir a carrito", "Ir al carrito.", "Ir al carrito"];
const go_to_home = ["ir al inicio", "ir a inicio", "Ir a inicio.", "Ir al inicio", "Ir al inicio.", "Ir a inicio."];
const go_to_create_category = [
  "ir a registrar categoría",
  "ir a crear categoría",
  "Ir a crear categoría.",
  "Ir a registrar categoría.",
  "Crear categoría."
];

// Navegar en la vista
const to_up = ["subir", "Subir", "Subir."];
const to_down = ["bajar","Bajar","Bajar."];
const to_full_up = ["subir todo", "Subir todo", "Subir todo."];
const to_full_down = ["bajar todo", "Bajar todo", "Bajar todo."];

// Insertar
const insert_category_name = [
  "insertar nombre categoría",
  "escribir nombre categoría",
  "Insertar nombre categoría.",
  "Escribir nombre categoría.",
];

// Click, DoubleClick, Anti-click
const on_click = ["clic en *"];

export const mockAllCommands = {
  search_product,
  select_to_product,
  search_category,
  add_to_cart,
  add_quantity_produtc_to_cart,
  buy_product,
  reset_voice_recognition,
  shutdown_voice_recognition,
  go_to_cart,
  go_to_home,
  go_to_create_category,
  to_up,
  to_down,
  to_full_up,
  to_full_down,
  insert_category_name,
  on_click,
};
