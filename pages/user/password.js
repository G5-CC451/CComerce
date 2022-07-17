import React, { useState } from "react";
import { auth } from "@/firebase";
// Components
import UserNav from "@/components/molecules/nav/UserNav";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");

        notification.success({
          message: "Contraseña actualizada",
          description: `Su contraseña se ha actualizado exitosamente.`,
        });
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: "Actualización de contraseña fallida",
          description: err.message,
        });
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Su contraseña</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Ingrese una nueva contraseña"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Guardar contraseña
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Cargando...</h4>
          ) : (
            <h4>Actualizar contraseña</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
