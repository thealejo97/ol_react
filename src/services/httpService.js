import BASE_URL from "./config";

let jwtToken = null;

export const setToken = (token) => {
  jwtToken = token;
};

const httpService = async (url, method = "GET", body = null, headers = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(jwtToken && { Authorization: `Bearer ${jwtToken}` }),
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : null,
    });

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
