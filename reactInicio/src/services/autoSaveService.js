// src/services/autoSaveService.js

// URL simulada si usas json-server o fallback a localStorage/memoria basado en db.json
const DB_KEY = 'user_autosave_data';

export const saveFormData = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulación de fallo aleatorio del 10% para probar el estado de 'error'
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject(new Error("Error al conectar con la base de datos (db.json)"));
      } else {
        // Persiste la estructura del db.json
        const updatedDb = { profile: data };
        localStorage.setItem(DB_KEY, JSON.stringify(updatedDb));
        resolve({ status: 200, message: "Petición HTTP simulada exitosa", data: updatedDb });
      }
    }, 1200);
  });
};

export const getInitialFormData = () => {
  const savedDb = localStorage.getItem(DB_KEY);
  if (savedDb) {
    try {
      const parsed = JSON.parse(savedDb);
      return parsed.profile;
    } catch {
      // Si falla la lectura, retorna el estado base del db.json
    }
  }
  return {
    nombre: "Alex Cubero",
    email: "alex.cubero@ejemplo.com",
    notas: "Desarrollador Front-End trabajando en laboratorio de automatización React."
  };
};