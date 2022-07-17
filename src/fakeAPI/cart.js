const MAX_CART_QTY = 5;

export const cart = Array(MAX_CART_QTY)
  .fill({
    _id: Math.random() * 123456,
    title: "Notebook",
    slug: "",
    description: "",
    price: 1.2,
    category: "",
    subs: [],
    quantity: Math.random() * 123456,
    sold: 0,
    count: 1,
    images: [],
    shipping: "No",
    color: "Plateado",
    brand: "Apple",
    ratings: [],
  })
  .map((elemFill, idxFill) => {
    return {
      ...elemFill,
      _id: Math.random() * 123456 * (idxFill + 1),
      title: `Producto a comprar ${idxFill + 1}`,
      slug: `producto-to-seller-${idxFill + 1}`,
      description: `Descripción del producto ${idxFill + 1}...`,
      price: Math.random() * 200,
      category: `Categoría del producto ${idxFill + 1}`,
      subs: [],
      quantity: Math.random() * 101 + 1,
      sold: 0,
      count: parseInt(Math.random() * 6),
      images: [],
      shipping: "No",
      color: "Plateado",
      brand: "Apple",
      ratings: [],
    };
  });
