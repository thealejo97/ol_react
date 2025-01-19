export const login = async (email, password) => {
  // Hashea la contraseña y el email para no enviar el texto plano
  const hashedEmail = btoa(email); 
  const hashedPassword = btoa(password); 
  // Se desencriptara en el backend
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:hashedEmail, password: hashedPassword }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error.message);
    throw error;
  }
};
