import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import LoginPageView from "./LoginPageView";
import { login } from "../../services/authService";

function LoginPageContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("🚀 ~ useEffect ~ token:", token)
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMessage("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const token = await login(email, password);
      localStorage.setItem("jwtToken", token);
      alert("Inicio de sesión exitoso");
      navigate("/home"); 
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
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
