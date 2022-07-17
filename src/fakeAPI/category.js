const MAX_CATEGORY_QTY = 30;

export const categories = Array(MAX_CATEGORY_QTY)
  .fill({
    name: "",
    slug: "",
  })
  .map((elemFill, idxFill) => {
    return { name: `Categoría ${idxFill + 1}`, slug: `category-${idxFill + 1}` };
  });
