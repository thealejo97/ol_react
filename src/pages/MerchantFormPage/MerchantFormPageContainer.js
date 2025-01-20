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

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await httpService(API_ENDPOINTS.DEPARTMENTS);
        setDepartments(response);
      } catch (err) {
        console.error("Error fetching departments", err);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch cities when department changes
  useEffect(() => {
    if (merchant.department) {
      const fetchCities = async () => {
        try {
          const response = await httpService(
            `${API_ENDPOINTS.CITIES}?department=${merchant.department}`
          );
          setCities(response);
        } catch (err) {
          console.error("Error fetching cities", err);
        }
      };
      fetchCities();
    }
  }, [merchant.department]);

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
    e.preventDefault();
    try {
      const response = await httpService(API_ENDPOINTS.MERCHANTS, "POST", {
        merchant,
        establishments,
      });
      alert("Formulario enviado correctamente");
      console.log(response);
    } catch (err) {
      alert("Error enviando el formulario");
      console.error(err);
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
