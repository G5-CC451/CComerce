import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/firebase";
import { useSelector } from "react-redux";
// Components
import { Button, Input, notification } from "antd";
import PublicBasic from "@/components/templates/public/Basic";

const InputStyle = {
  background: "#EBEBEB",
  borderRadius: "20px",
};

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) router.push("/");
  }, [router, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    console.table(email, config);

    await auth.sendSignInLinkToEmail(auth.getAuth(), email, config);
    notification.success({
      message: "Confirma tu correo electrónico",
      description: `Se ha enviado un correo a ${email}. Haga clic en el link enviado a su bandeja para completar su registro en nuestro sistema.`,
    });

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <p>
        Ingrese su correo electrónico para proseguir con el registro. El correo
        debe encontrarse habilitado.
      </p>
      <div className="form-group">
        <label>Correo:</label>
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
        Continuar
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
          <div className="col-md-8 offset-md-2">
            <h4
              style={{
                width: "100%",
                textAlign: "center",
                margin: "36px 0 72px 0",
              }}
            >
              REGISTRO
            </h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </PublicBasic>
  );
};

export default Register;
