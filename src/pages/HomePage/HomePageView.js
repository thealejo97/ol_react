import React from "react";
import styles from "./HomePage.module.css";

const HomePageView = ({
  merchants,
  loading,
  error,
  onLogout,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  onCreateNewForm,
  onDownloadCSV, 
  onToggleStatus,
  onDeleteMerchant
}) => {
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const MAX_VISIBLE_PAGES = 5;

    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(MAX_VISIBLE_PAGES / 2), totalPages - MAX_VISIBLE_PAGES + 1)
    );
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          className={styles.paginationButton}
          onClick={() => onPageChange(1)}
        >
          &laquo;
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className={styles.paginationEllipsis}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            i === currentPage ? styles.activePage : ""
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className={styles.paginationEllipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key="last"
          className={styles.paginationButton}
          onClick={() => onPageChange(totalPages)}
        >
          &raquo;
        </button>
      );
    }

    return (
      <div className={styles.paginationWrapper}>
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </button>
        {pages}
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </button>
      </div>
    );
  };

  return (
    <div className={styles.homeContainer}>
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
              src="/assets/images/user-icon.png"
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

      <h1 className={styles.title}>Lista Formularios Creados</h1>

      <div className={styles.actionButtons}>
        <button
          className={styles.newFormButton}
          onClick={onCreateNewForm} 
        >
          Crear Formulario Nuevo
        </button>
        <button
          className={styles.downloadCSVButton}
          onClick={onDownloadCSV}
        >
          Descargar Reporte en CSV
        </button>
      </div>

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
                    <button
                      className={styles.toggleButton}
                      onClick={() => onToggleStatus(merchant.id, merchant.status)}
                    >
                      {merchant.status === "Active" ? "✔️" : "❌"}
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDeleteMerchant(merchant.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            <div className={styles.paginationControls}>
              <label>
                Items:
                <select
                  value={itemsPerPage}
                  onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                  className={styles.itemsSelect}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
              {renderPagination()}
            </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>Prueba Técnica De Uso Exclusivo de OLSoftware S.A.</p>
      </footer>
    </div>
  );
};

export default HomePageView;
