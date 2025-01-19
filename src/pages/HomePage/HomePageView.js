import React from "react";
import styles from "./HomePage.module.css";

const HomePageView = ({ merchants, loading, error, onLogout }) => {
  return (
    <div className={styles.homeContainer}>
      {/* Header principal */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            src="/assets/images/logo.png"
            alt="Logo OL"
            className={styles.logo}
          />
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>
              Lista Formulario
            </a>
            <a href="#" className={styles.navLink}>
              Crear Formulario
            </a>
          </nav>
        </div>
        <div className={styles.headerRight}>
        <div className={styles.userContainer}>
            <img
            src="/assets/images/user-icon.png" // Ícono de usuario
            alt="User Icon"
            className={styles.userIcon}
            />
            <div className={styles.userDetails}>
            <span className={styles.welcomeText}>Bienvenido!</span>
            <span className={styles.userName}>John Doe</span>
            <small className={styles.userRole}>Administrador</small>
            </div>
        </div>
        </div>

      </header>

      {/* Título principal */}
      <h1 className={styles.title}>Lista Formularios Creados</h1>

      {/* Botones de acciones */}
      <div className={styles.actionButtons}>
        <button className={styles.newFormButton}>Crear Formulario Nuevo</button>
        <button className={styles.downloadCSVButton}>
          Descargar Reporte en CSV
        </button>
      </div>

      {/* Contenido principal */}
      {loading && <p>Cargando comerciantes...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Razón Social</th>
                <th>Teléfono</th>
                <th>Correo Electrónico</th>
                <th>Fecha Registro</th>
                <th>No. Establecimientos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id}>
                  <td>{merchant.businessName}</td>
                  <td>{merchant.phone}</td>
                  <td>{merchant.email}</td>
                  <td>{merchant.createdOn}</td>
                  <td>{merchant.numberOfEstablishments}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        merchant.status === "Active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {merchant.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.editButton}>✏️</button>
                    <button className={styles.toggleButton}>
                      {merchant.status === "Active" ? "❌" : "✔️"}
                    </button>
                    <button className={styles.deleteButton}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Prueba Técnica De Uso Exclusivo de OLSoftware S.A.</p>
      </footer>
    </div>
  );
};

export default HomePageView;
