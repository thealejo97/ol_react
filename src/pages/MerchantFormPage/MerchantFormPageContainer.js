import React, { useState, useEffect } from "react";
import MerchantFormPageView from "./MerchantFormPageView";
import httpService from "../../services/httpService"; // Simulando un servicio HTTP
import { API_ENDPOINTS } from "../../services/config";

const MerchantFormPageContainer = () => {
  const [merchant, setMerchant] = useState({
    businessName: "",
    department: "",
    city: "",
    phone: "",
    email: "",
    registrationDate: "",
    hasEstablishments: false,
  });

  const [establishments, setEstablishments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Fetch departments (with cities included)
  useEffect(() => {
    const fetchDepartmentsWithCities = async () => {
      try {
        const response = await httpService(API_ENDPOINTS.DEPARTMENTS);
        const departmentsWithCities = response.content.map((department) => ({
          id: department.id,
          name: department.name,
          cities: department.cities.map((city) => ({
            id: city.id,
            name: city.name,
          })),
        }));
        setDepartments(departmentsWithCities);
      } catch (err) {
        console.error("Error fetching departments and cities:", err);
      }
    };

    fetchDepartmentsWithCities();
  }, []);

  // Update cities when department changes
  useEffect(() => {
    if (merchant.department) {
      const selectedDepartment = departments.find(
        (dept) => dept.id === parseInt(merchant.department, 10)
      );
      if (selectedDepartment) {
        setCities(selectedDepartment.cities);
      }
    } else {
      setCities([]); // Limpia las ciudades si no hay departamento seleccionado
    }
  }, [merchant.department, departments]);

  // Calculate totals when establishments change
  useEffect(() => {
    const totalIncomes = establishments.reduce(
      (acc, est) => acc + parseFloat(est.incomes || 0),
      0
    );
    const totalEmployees = establishments.reduce(
      (acc, est) => acc + parseInt(est.employees || 0, 10),
      0
    );
    setTotalIncomes(totalIncomes);
    setTotalEmployees(totalEmployees);
  }, [establishments]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMerchant({
      ...merchant,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddEstablishment = () => {
    setEstablishments([
      ...establishments,
      { name: "", incomes: 0, employees: 0 },
    ]);
  };

  const handleEstablishmentChange = (index, field, value) => {
    const updatedEstablishments = [...establishments];
    updatedEstablishments[index][field] = value;
    setEstablishments(updatedEstablishments);
  };

  const handleRemoveEstablishment = (index) => {
    const updatedEstablishments = establishments.filter((_, i) => i !== index);
    setEstablishments(updatedEstablishments);
  };

  const handleSubmit = async (e) => {
    console.log("Formulario enviado:", merchant, establishments);
    e.preventDefault();

    // Crear el payload que coincida con la estructura esperada por el API
    const payload = {
      businessName: merchant.businessName,
      cityId: parseInt(merchant.city, 10), // Asegúrate de que sea un número
      departmentId: parseInt(merchant.department, 10), // Asegúrate de que sea un número
      phone: merchant.phone,
      email: merchant.email,
      status: "Active", // Puedes cambiar esto si el estado es dinámico
      createdBy: "admin", // Puedes reemplazarlo por el usuario actual si está disponible
    };

    try {
      // Realiza la solicitud POST al endpoint MERCHANTS
      const response = await httpService(API_ENDPOINTS.MERCHANTS, "POST", payload);
      alert("Formulario enviado correctamente");
      console.log("Respuesta del servidor:", response);

      // Limpia el formulario después de enviarlo
      setMerchant({
        businessName: "",
        department: "",
        city: "",
        phone: "",
        email: "",
        registrationDate: "",
        hasEstablishments: false,
      });
      setEstablishments([]);
    } catch (err) {
      alert("Error enviando el formulario");
      console.error("Error en la solicitud:", err);
    }
  };

  return (
    <MerchantFormPageView
      merchant={merchant}
      departments={departments}
      cities={cities}
      establishments={establishments}
      totalIncomes={totalIncomes}
      totalEmployees={totalEmployees}
      onInputChange={handleInputChange}
      onAddEstablishment={handleAddEstablishment}
      onEstablishmentChange={handleEstablishmentChange}
      onRemoveEstablishment={handleRemoveEstablishment}
      onSubmit={handleSubmit}
    />
  );
};

export default MerchantFormPageContainer;
