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

  const navigate = useNavigate(); 

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

  const handleNavigateMerchant = () => {
    navigate("/merchant-form");
  };
  const handleNavigateListMerchant = () => {
    navigate("/home");
  };

  const handleDownloadCSV = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_ENDPOINTS.MERCHANTS_EXCEL}`, {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
          ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        },
      });


      if (!response.ok) {
        throw new Error("No se pudo descargar el archivo CSV");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte_comerciantes.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al intentar descargar el archivo CSV.");
    }
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
    navigate("/merchant-form"); 
  };

  const handleToggleStatus = async (merchantId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_ENDPOINTS.MERCHANTS}/${merchantId}/status?status=${newStatus}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        },
      });
  
      if (!response.ok) {
        throw new Error("No se pudo cambiar el estado del comerciante");
      }
  
      alert(`El comerciante fue ${newStatus === "Active" ? "activado" : "desactivado"} correctamente.`);
  
      
      const updatedMerchants = merchants.map((merchant) =>
        merchant.id === merchantId ? { ...merchant, status: newStatus } : merchant
      );
      setMerchants(updatedMerchants);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al intentar cambiar el estado del comerciante.");
    }
  };

  const handleDeleteMerchant = async (merchantId) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_ENDPOINTS.MERCHANTS}/${merchantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
        },
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar el comerciante");
      }
  
      alert("El comerciante fue eliminado correctamente.");
  
      // Actualiza la lista de comerciantes después de la eliminación
      const updatedMerchants = merchants.filter((merchant) => merchant.id !== merchantId);
      setMerchants(updatedMerchants);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al intentar eliminar el comerciante.");
    }
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
      onCreateNewForm={handleCreateNewForm}
      onDownloadCSV={handleDownloadCSV}
      onToggleStatus={handleToggleStatus}
      onDeleteMerchant={handleDeleteMerchant}
      handleNavigateMerchant={handleNavigateMerchant}
      handleNavigateListMerchant={handleNavigateListMerchant}
    />

  );
};

export default HomePageContainer;

  