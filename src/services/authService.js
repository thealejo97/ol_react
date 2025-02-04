import httpService from "./httpService";
import { API_ENDPOINTS } from "./config";

export const login = async (email, password) => {
    // Hashea la contraseña y el email para no enviar el texto plano
    const hashedEmail = email;
    const hashedPassword = password;
    // const hashedEmail = btoa(email);
    // const hashedPassword = btoa(password);
    // Se desencriptara en el backend

  const response = await httpService(API_ENDPOINTS.LOGIN, "POST", {
    email:hashedEmail,
    password:hashedPassword,
  });

  localStorage.setItem("jwtToken", response.token);
  return response.token;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};
