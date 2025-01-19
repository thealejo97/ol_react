import React, { useEffect, useState } from "react";
import HomePageView from "./HomePageView";
import httpService from "../../services/httpService"; 
import { API_ENDPOINTS } from "../../services/config";

const HomePageContainer = () => {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [itemsPerPage, setItemsPerPage] = useState(10); // Número de elementos por página
  
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
      setCurrentPage(1); // Reinicia la página actual
    };
  
    const handleLogout = () => {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
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
      />
    );
  };
  
  export default HomePageContainer;
  