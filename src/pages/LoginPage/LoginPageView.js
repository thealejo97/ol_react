import React from "react";
import styles from "./LoginPage.module.css";

function LoginPageView({
  email,
  setEmail,
  password,
  setPassword,
  termsAccepted,
  setTermsAccepted,
  errorMessage,
  handleSubmit,
}) {
  return (
    <div
      className={styles.loginContainer}
      style={{
        backgroundImage: `url('/assets/images/fondo.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Debes iniciar sesión para acceder a la plataforma</h2>
        <hr></hr>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            Acepto términos y condiciones
          </label>
        </div>
        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPageView;
