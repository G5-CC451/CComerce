import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Business logic
import { getProductsByCount, removeProduct } from "@/functions/product";
// Components
import { notification } from "antd";
import AdminNav from "@/components/molecules/nav/AdminNav";
import AdminProductCard from "@/components/molecules/cards/AdminProductCard";

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("¿Desea eliminar producto?")) {
      setLoading(true);
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          notification.success({
            message: "Producto eliminado",
            description: `¡Producto "${res.data.name}" fue eliminado satisfactoriamente!`,
          });
          loadAllProducts();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            notification.error({
              message: "Error al eliminar producto",
              description: err.response.data,
            });
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Cargando...</h4>
          ) : (
            <h4>Productos</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
