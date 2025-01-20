import React, { useState, useEffect } from "react";
import MerchantFormPageView from "./MerchantFormPageView";
import httpService from "../../services/httpService"; 
import { API_ENDPOINTS } from "../../services/config";
import { useNavigate, useParams } from "react-router-dom";

const MerchantFormPageContainer = () => {
  const { id } = useParams(); // Obtiene el ID del comerciante (si existe)
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

  // Carga los datos del comerciante si es actualización
  useEffect(() => {
    if (id) {
      const fetchMerchant = async () => {
        try {
          const data = await httpService(`${API_ENDPOINTS.MERCHANTS}/${id}`);
          console.log("🚀 ~ fetchMerchant ~ data:", data);
  
          // Convertir la fecha al formato `YYYY-MM-DD`
          const formattedDate = data.createdOn
            ? new Date(data.createdOn).toISOString().split("T")[0]
            : "";
  
          setMerchant({
            businessName: data.businessName,
            department: data.department.id.toString(),
            city: data.city.id.toString(),
            phone: data.phone,
            email: data.email,
            registrationDate: formattedDate, // Usar la fecha formateada
            hasEstablishments: data.numberOfEstablishments > 0,
          });
  
          // Si el comerciante tiene establecimientos
          setEstablishments(data.establishments || []);
        } catch (err) {
          console.error("Error fetching merchant:", err);
        }
      };
  
      fetchMerchant();
    }
  }, [id]);
  

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
    e.preventDefault();

    const payload = {
      businessName: merchant.businessName,
      cityId: parseInt(merchant.city, 10),
      departmentId: parseInt(merchant.department, 10),
      phone: merchant.phone,
      email: merchant.email,
      registrationDate: merchant.registrationDate,
      hasEstablishments: merchant.hasEstablishments,
      status:'Active',
      establishments,
    };

    try {
      if (id) {
        // Actualización
        await httpService(`${API_ENDPOINTS.MERCHANTS}/${id}`, "PUT", payload);
        alert("Formulario actualizado correctamente");
      } else {
        // Creación
        await httpService(API_ENDPOINTS.MERCHANTS, "POST", payload);
        alert("Formulario enviado correctamente");
      }
      navigate("/home");
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
