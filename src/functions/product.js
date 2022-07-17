import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.API_URL}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.API_URL}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.API_URL}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.API_URL}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.API_URL}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.API_URL}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.API_URL}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.API_URL}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelated = async (productId) =>
  await axios.get(`${process.env.API_URL}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.API_URL}/search/filters`, arg);
