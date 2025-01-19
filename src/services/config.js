const BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  USERS: `${BASE_URL}/users`,
  MERCHANTS: `${BASE_URL}/merchants`,
  PRODUCTS: `${BASE_URL}/products`,
};

export default BASE_URL;
