import React from "react";
import styles from "./HomePage.module.css";

const HomePageView = ({ merchants, loading, error, onLogout }) => {
  return (
    <div className={styles.homeContainer}>
      {/* Header principal */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/assets/images/logo.png" alt="Logo OL" className={styles.logo} />
          <h1>Lista Formularios Creados</h1>
        </div>
        <div className={styles.headerRight}>
          <button onClick={onLogout} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Botones de acciones */}
      <div className={styles.actionButtons}>
        <button className={styles.newFormButton}>Crear Formulario Nuevo</button>
        <button className={styles.downloadCSVButton}>Descargar Reporte en CSV</button>
      </div>

      {/* Contenido principal */}
      {loading && <p>Cargando comerciantes...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
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
                <td>{new Date(merchant.createdOn).toLocaleDateString('en-CA')}</td>
                <td>{merchant.numberOfEstablishments}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      merchant.status ? styles.active : styles.inactive
                    }`}
                  >
                    {merchant.status ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button className={styles.editButton}>✏️</button>
                  <button className={styles.toggleButton}>
                    {merchant.active ? "❌" : "✔️"}
                  </button>
                  <button className={styles.deleteButton}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePageView;
