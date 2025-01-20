import React, { useEffect, useState } from "react";
import HomePageView from "./HomePageView";
import httpService from "../../services/httpService"; 
import { API_ENDPOINTS } from "../../services/config";
import { useNavigate } from "react-router-dom";

const HomePageContainer = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    const fetchMerchants = async () => {
      setLoading(true);
      try {
        const data = await httpService(
          `${API_ENDPOINTS.MERCHANTS}?page=${currentPage - 1}&size=${itemsPerPage}`
        );
        setMerchants(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Error al cargar los comerciantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const handleCreateNewForm = () => {
    navigate("/merchant-form"); // Navegar a la página de formulario
  };

  return (
    <HomePageView
      merchants={merchants}
      loading={loading}
      error={error}
      onLogout={handleLogout}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={handleItemsPerPageChange}
      onCreateNewForm={handleCreateNewForm} // Pasar el manejador al componente View
    />
  );
};

export default HomePageContainer;

  