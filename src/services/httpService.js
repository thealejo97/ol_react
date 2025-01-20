import BASE_URL from "./config";

const httpService = async (url, method = "GET", body = null, headers = {}) => {
  const jwtToken = localStorage.getItem("jwtToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
  };

  try {
    const response = await fetch(`${url}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : null,
    });

    // Manejo del código 403 Unauthorized
    if (response.status === 403) {
      console.warn("Sesión no autorizada, redirigiendo al login...");
      localStorage.removeItem("jwtToken"); // Limpia el token
      window.location.href = "/login"; // Redirige al login
      return;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la petición");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición HTTP:", error.message);
    throw error;
  }
};

export default httpService;
