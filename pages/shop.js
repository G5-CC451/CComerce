import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Business logic
import { getProductsByCount, fetchProductsByFilter } from "@/functions/product";
import { getCategories } from "@/functions/category";
import { getSubs } from "@/functions/sub";
// Components
import ProductCard from "@/components/molecules/cards/ProductCard";
import PublicBasic from "@/components/templates/public/Basic";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(Array(16).fill(res.data[0]));
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(Array(16).fill(p.data[0]));
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok, price]);

  return (
    <PublicBasic>
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <h4 className="text-danger">Cargando...</h4>
          ) : (
            <h4>Resultados de Búsqueda</h4>
          )}

          {products.length < 1 && <p>No se encontraron productos</p>}

          <div className="row pb-5">
            {console.log("products", products)}
            {products[0] &&
              products.map((product, idx) => (
                <div key={product._id} className="col-md-3 mt-3">
                  <ProductCard product={product} value={idx + 1} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </PublicBasic>
  );
};

export default Shop;
