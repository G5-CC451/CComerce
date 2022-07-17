import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { auth } from "@/firebase";
import { createOrUpdateUser } from "@/functions/auth";
// Components
import { Button, Input } from "antd";
import PublicBasic from "@/components/templates/public/Basic";

const InputStyle = {
  background: "#EBEBEB",
  borderRadius: "20px",
};

const RegisterComplete = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      notification.error({
        message: "Error",
        description: "Correo y contraseña son campos obligatorios",
      });
      return;
    }

    if (password.length < 6) {
      notification.error({
        message: "Error",
        description: "La contraseña debe tener al menos 6 carácteres",
      });
      return;
    }
    console.table(email, password);

    try {
      const result = await auth.signInWithEmailLink(
        auth.getAuth(),
        email,
        window.location.href
      );
      console.log("RESULT", result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        // jhonny.lorenzo.r@uni.pe

        await auth.updatePassword(result.user, password);
        const idTokenResult = await auth.getIdTokenResult(result.user);

        console.log("user", auth, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Correo electrónico</label>
        <Input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo"
          autoFocus
          style={InputStyle}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <Input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          style={InputStyle}
        />
      </div>
      <br />

      <Button
        onClick={handleSubmit}
        className="mb-3"
        block
        size="large"
        style={{
          borderRadius: "12px",
          color: "#000000",
          background: "#FF9E6D",
          border: "1px solid #FF9E6D",
        }}
      >
        Crear cuenta
      </Button>
    </form>
  );

  return (
    <PublicBasic>
      <div
        style={{
          width: "609px",
          height: "598px",
          background: "#DBDBDB",
          border: "1px solid #FF9E6D",
          borderRadius: "20px",
          margin: "auto",
          marginTop: "120px",
          padding: "32px 0",
          boxSizing: "border-box",
        }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>COMPLETA TU REGISTRO</h4>
            {completeRegistrationForm()}
          </div>
        </div>
      </div>
    </PublicBasic>
  );
};

export default RegisterComplete;
