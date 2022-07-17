import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Business logic
import { createProduct } from "@/functions/product";
import { getCategories, getCategorySubs } from "@/functions/category";
// Components
import { notification } from "antd";
import AdminNav from "@/components/molecules/nav/AdminNav";
import ProductCreateForm from "@/components/molecules/forms/ProductCreateForm";
import FileUpload from "@/components/molecules/forms/FileUpload";
// Assets
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Macbook Pro M2",
  description: "Very expense",
  price: "4500",
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: "50",
  images: [],
  colors: ["Negro", "Marrón", "Plateado", "Blanco", "Azul"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "Blanco",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const loadCategories = React.useCallback(() =>
    getCategories().then((c) => setValues({ ...values, categories: c.data })), [values]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        notification.success({
          message: "Producto creado",
          description: `¡Producto "${res.data.title}" fue creado satisfactoriamente!`,
        });
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: "Error al crear producto",
          description: err.response.data.err,
        });
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();

    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Crear producto</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
