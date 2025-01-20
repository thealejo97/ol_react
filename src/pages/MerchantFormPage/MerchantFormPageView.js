import React, { useRef } from "react";
import styles from "./MerchantFormPage.module.css";

const MerchantFormPageView = ({
  merchant,
  departments,
  cities,
  establishments,
  totalIncomes,
  totalEmployees,
  onInputChange,
  onAddEstablishment,
  onEstablishmentChange,
  onRemoveEstablishment,
  onSubmit,
  handleNavigateMerchant,
  handleNavigateListMerchant,
  isAddingEstablishment, // Nueva prop
  newEstablishment, // Nueva prop
  onNewEstablishmentChange, // Nueva prop
  onSaveNewEstablishment, // Nueva prop
  onCancelNewEstablishment, // Nueva prop
}) => {
  const formRef = useRef(null); // Referencia al formulario

  const handleManualSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Dispara el submit del formulario
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            src="/assets/images/logo.png"
            alt="Logo OL"
            className={styles.logo}
          />
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink} onClick={handleNavigateListMerchant}>
              Lista Formulario
            </a>
            <a href="#" className={styles.navLink} onClick={handleNavigateMerchant}>
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

      <h1 className={styles.title}>Formulario de Comerciante</h1>
      <form onSubmit={onSubmit} className={styles.form} ref={formRef}>
        <div className={styles.formGroup}>
          <label>Razón Social:</label>
          <input
            type="text"
            name="businessName"
            value={merchant.businessName}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Departamento:</label>
          <select
            name="department"
            value={merchant.department}
            onChange={onInputChange}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Municipio:</label>
          <select
            name="city"
            value={merchant.city}
            onChange={onInputChange}
            required
          >
            <option value="">Seleccione un municipio</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={merchant.phone}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={merchant.email}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Registro:</label>
          <input
            type="date"
            name="registrationDate"
            value={merchant.registrationDate}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="hasEstablishments"
              checked={merchant.hasEstablishments}
              onChange={onInputChange}
            />
            ¿Posee establecimientos?
          </label>
        </div>


      </form>
      
      {merchant.hasEstablishments && (
  <div className={styles.formEstablishment}>
    <h3>Gestionar Establecimiento</h3>
    <button
      type="button"
      onClick={onAddEstablishment}
      className={styles.createEstablishmentButton}
    >
      Crear Establecimiento
    </button>
    <div className={styles.establishmentsGrid}>
      {establishments.map((est, index) => (
        <div key={index} className={styles.establishmentCard}>
          <h4>{`Empresa ${index + 1}`}</h4>
          <p>
            <strong>Nombre establecimiento:</strong> {est.name || "Sin nombre"}
          </p>
          <p>
            <strong>Ingresos:</strong> ${est.incomes?.toLocaleString() || 0}
          </p>
          <p>
            <strong>No. Empleados:</strong> {est.employees || 0}
          </p>
          <div className={styles.cardActions}>
            <button
              type="button"
              onClick={() => onEstablishmentChange(index, "edit", true)}
              className={styles.editButton}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onRemoveEstablishment(index)}
              className={styles.deleteButton}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {isAddingEstablishment && (
        <div className={styles.newEstablishmentCard}>
          <h4>Nuevo Establecimiento</h4>
          <input
            type="text"
            placeholder="Nombre Establecimiento *"
            value={newEstablishment.name || ""}
            onChange={(e) => onNewEstablishmentChange("name", e.target.value)}
            className={styles.establishmentInput}
          />
          <input
            type="number"
            placeholder="Ingresos *"
            value={newEstablishment.incomes || ""}
            onChange={(e) => onNewEstablishmentChange("incomes", e.target.value)}
            className={styles.establishmentInput}
          />
          <input
            type="number"
            placeholder="No. Empleados"
            value={newEstablishment.employees || ""}
            onChange={(e) => onNewEstablishmentChange("employees", e.target.value)}
            className={styles.establishmentInput}
          />
          <button
            type="button"
            onClick={onSaveNewEstablishment}
            className={styles.saveEstablishmentButton}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancelNewEstablishment}
            className={styles.cancelEstablishmentButton}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  </div>
)}
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <p className={styles.footerLabel}>Total Ingresos Formulario:</p>
          <p className={styles.footerValue}>{`$${totalIncomes.toLocaleString()}`}</p>
        </div>
        <div className={styles.footerItem}>
          <p className={styles.footerLabel}>Cantidad de empleados:</p>
          <p className={styles.footerValue}>{totalEmployees}</p>
        </div>
        <button
          type="button"
          className={styles.submitButton}
          onClick={handleManualSubmit} 
        >
          Enviar Formulario
        </button>
      </footer>
    </div>
  );
};

export default MerchantFormPageView;
