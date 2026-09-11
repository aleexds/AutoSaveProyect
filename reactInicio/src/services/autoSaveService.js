// Simulación de petición asíncrona hacia una API / db.json
export const saveFormData = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula un 10% de probabilidad de error para probar el estado de 'error'
      const shouldFail = Math.random() < 0.1;
      
      if (shouldFail) {
        reject(new Error("Error de conexión con el servidor"));
      } else {
        localStorage.setItem("user_autosave_data", JSON.stringify(data));
        resolve({ status: 200, message: "Guardado exitoso", data });
      }
    }, 1200);
  });
};