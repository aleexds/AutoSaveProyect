// src/services/autoSaveService.js
const API_URL = 'http://localhost:3001/profile';

export const saveFormData = async (data) => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar db.json');
  }

  return await response.json();
};

export const getInitialFormData = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error al cargar db.json:', error);
  }
  return { nombre: '', email: '', notas: '' };
};