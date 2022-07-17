import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
// Business logic
import { createSub, removeSub, getSubs } from "@/functions/sub";
import { getCategories } from "@/functions/category";
// Components
import { notification } from "antd";
import AdminNav from "@/components/molecules/nav/AdminNav";
import CategoryForm from "@/components/molecules/forms/CategoryForm";
import LocalSearch from "@/components/molecules/forms/LocalSearch";
import PrivateBasic from "@/components/templates/private/Basic";
// Assets
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        notification.success({
          message: "Subcategoría creada",
          description: `¡Subcategoría "${res.data.name}" fue creada satisfactoriamente!`,
        });
        loadSubs();
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
    if (window.confirm("¿Desea eliminar subcategoría?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          notification.success({
            message: "Subcategoría eliminada",
            description: `¡Subcategoría "${res.data.name}" fue eliminada satisfactoriamente!`,
          });
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            notification.error({
              message: "Error al eliminar subcategoría",
              description: err.response.data,
            });
          }
        });
    }
  };

  // step 4
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
              <h4 className="text-danger">Cargando..</h4>
            ) : (
              <h4>Crear subcategoría</h4>
            )}

            <div className="form-group">
              <label>Categoría padre</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Seleccione una opción</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {subs.filter(searched(keyword)).map((s) => (
              <div className="alert alert-secondary" key={s._id}>
                {s.name}
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link href={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
