import httpService, { setToken } from "./httpService";
import { API_ENDPOINTS } from "./config";

export const login = async (email, password) => {
  // // Hashea la contraseña y el email para no enviar el texto plano
  // const hashedEmail = btoa(email);
  // const hashedPassword = btoa(password);
  // // Se desencriptara en el backend


  // const response = await httpService(API_ENDPOINTS.LOGIN, "POST", {
  //   email: hashedEmail,
  //   password: hashedPassword,
  // });
  // setToken(response.token); 
  // return response.token; 
  console.log("Setting fake response")
  //Fake response api ok
  setToken("ASDA51A681DAD86A1S")
  return"ASDA51A681DAD86A1S"

};


export const logout = () => {
  setToken(null); 
  localStorage.removeItem("jwtToken"); 
};
