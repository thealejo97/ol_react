import React, { useEffect, useState } from "react";
import HomePageView from "./HomePageView";
import httpService from "../../services/httpService"; 
import { API_ENDPOINTS } from "../../services/config";

const HomePageContainer = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const data = await httpService(API_ENDPOINTS.MERCHANTS); 
        setMerchants(data.content);
      } catch (err) {
        setError("Error al cargar los comerciantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

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
    />
  );
};

export default HomePageContainer;
