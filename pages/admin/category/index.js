import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
// Business logic
import {
  createCategory,
  getCategories,
  removeCategory,
} from "@/functions/category";
// Components
import { notification } from "antd";
import AdminNav from "@/components/molecules/nav/AdminNav";
import CategoryForm from "@/components/molecules/forms/CategoryForm";
import LocalSearch from "@/components/molecules/forms/LocalSearch";
// Assets
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PrivateBasic from "@/components/templates/private/Basic";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("user", user);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        notification.success({
          message: "Categoría creada",
          description: `¡Categoría "${res.data.name}" fue creada satisfactoriamente!`,
        });
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          notification.error({
            message: "Error al crear categoría",
            description: err.response.data,
          });
        }
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("¿Desea eliminar categoría?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          notification.success({
            message: "Categoría eliminada",
            description: `¡Categoría "${res.data.name}" fue eliminada satisfactoriamente!`,
          });
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            notification.error({
              message: "Error al eliminar categoría",
              description: err.response.data,
            });
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <PrivateBasic>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <h4 className="text-danger">Cargando...</h4>
            ) : (
              <h4>Crear categoría</h4>
            )}

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {categories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name}
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link href={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateBasic>
  );
};

export default CategoryCreate;
