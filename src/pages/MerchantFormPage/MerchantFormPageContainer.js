import React, { useState, useEffect } from "react";
import MerchantFormPageView from "./MerchantFormPageView";
import httpService from "../../services/httpService"; 
import { API_ENDPOINTS } from "../../services/config";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); 

  const [establishments, setEstablishments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  
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

  
  useEffect(() => {
    if (merchant.department) {
      const selectedDepartment = departments.find(
        (dept) => dept.id === parseInt(merchant.department, 10)
      );
      if (selectedDepartment) {
        setCities(selectedDepartment.cities);
      }
    } else {
      setCities([]); 
    }
  }, [merchant.department, departments]);

  
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

  const handleNavigateMerchant = () => {
    navigate("/merchant-form");
  };
  const handleNavigateListMerchant = () => {
    navigate("/home");
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

    
    const payload = {
      businessName: merchant.businessName,
      cityId: parseInt(merchant.city, 10), 
      departmentId: parseInt(merchant.department, 10), 
      phone: merchant.phone,
      email: merchant.email,
      status: "Active", 
      createdBy: "admin", 
    };

    try {
      
      const response = await httpService(API_ENDPOINTS.MERCHANTS, "POST", payload);
      alert("Formulario enviado correctamente");
      console.log("Respuesta del servidor:", response);

      
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
      handleNavigateMerchant={handleNavigateMerchant}
      handleNavigateListMerchant={handleNavigateListMerchant}
    />
  );
};

export default MerchantFormPageContainer;
