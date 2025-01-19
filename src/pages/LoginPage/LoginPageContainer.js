import React, { useState } from "react";
import LoginPageView from "./LoginPageView";
import { login } from "../../services/authService";

function LoginPageContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMessage("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const token = await login(email, password);
      localStorage.setItem("authToken", token);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      setErrorMessage("Credenciales inválidas");
    }
  };

  return (
    <LoginPageView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      termsAccepted={termsAccepted}
      setTermsAccepted={setTermsAccepted}
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
    />
  );
}

export default LoginPageContainer;
