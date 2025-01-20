const BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  USERS: `${BASE_URL}/users`,
  MERCHANTS: `${BASE_URL}/merchants`,
  MERCHANTS_EXCEL: `${BASE_URL}/establishments/export`,
  PRODUCTS: `${BASE_URL}/products`,
};

export default BASE_URL;
