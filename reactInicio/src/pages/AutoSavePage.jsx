// src/pages/AutoSavePage.jsx
import { useState, useEffect } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { FormField } from '../components/FormField';
import { saveFormData, getInitialFormData } from '../services/autoSaveService';

export const AutoSavePage = () => {
  // 1. Inicializa leyendo la estructura definida en db.json
  const [formData, setFormData] = useState(() => getInitialFormData());

  // 2. Estados de la automatización: 'inactivo' | 'en ejecucion' | 'exito' | 'error'
  const [status, setStatus] = useState('inactivo');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Manejador del evento onChange (Trigger)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true); // Se marca que hubo interacción y cambios locales
  };

  // 3. EFECTO AUTOMATIZADO CON DEBOUNCE Y LIMPIEZA DE EFECTOS
  useEffect(() => {
    // Si no hay cambios locales hechos por el usuario, no ejecuta la automatización
    if (!isDirty) return;

    // Disparador temporizado de 2 segundos (Debounce)
    const timerId = setTimeout(async () => {
      setStatus('en ejecucion');
      setErrorMessage('');

      try {
        // Petición asíncrona enviando los nuevos datos
        await saveFormData(formData);
        setStatus('exito');
        setIsDirty(false); // Reinicia la bandera tras guardar con éxito

        // Retorna visualmente al estado 'inactivo' tras 3 segundos
        const resetTimer = setTimeout(() => {
          setStatus('inactivo');
        }, 3000);

        return () => clearTimeout(resetTimer);
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message);
      }
    }, 2000);

    // Limpieza técnica para evitar fugas de memoria (Memory Leaks) al reescribir rápido
    return () => clearTimeout(timerId);
  }, [formData, isDirty]);

  return (
    <div className="container">
      <header>
        <h1>Laboratorio de Automatización en React</h1>
        <p className="subtitle">Módulo de Guardado Automático con Debounce y db.json</p>
        <StatusBadge status={status} errorMessage={errorMessage} />
      </header>

      <form className="card" onSubmit={(e) => e.preventDefault()}>
        <FormField
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <FormField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormField
          label="Notas del Proyecto"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          isTextArea={true}
        />
      </form>
    </div>
  );
};