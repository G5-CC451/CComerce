import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// Business logic
import { getCategory, updateCategory } from "@/functions/category";
// Components
import { notification } from "antd";
import AdminNav from "@/components/molecules/nav/AdminNav";
import CategoryForm from "@/components/molecules/forms/CategoryForm";

const CategoryUpdate = () => {
  const router = useRouter();
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const loadCategory = React.useCallback(() =>
    getCategory(router.query.slug).then((c) => setName(c.data.name)),[router.query.slug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateCategory(router.query.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        notification.success({
          message: "Categoría actualizada",
          description: `¡Categoría "${res.data.name}" fue actualizada satisfactoriamente!`,
        });
        router.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          notification.error({
            message: "Error al actualizar categoría",
            description: err.response.data,
          });
        }
      });
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
            <h4>Actualizar categoría</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
