import { useState, useEffect } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { FormField } from '../components/FormField';
import { saveFormData } from '../services/autoSaveService';

export const AutoSavePage = () => {
  // Estado del formulario
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('user_autosave_data');
    return saved ? JSON.parse(saved) : { nombre: '', email: '', notas: '' };
  });

  // Estados del flujo automatizado: 'inactivo' | 'en ejecucion' | 'exito' | 'error'
  const [status, setStatus] = useState('inactivo');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Manejador del evento onChange (Trigger)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  // EFECTO AUTOMATIZADO CON DEBOUNCE Y LIMPIEZA
  useEffect(() => {
    if (!isDirty) return;

    // Disparador temporizado de 2 segundos (Debounce)
    const timerId = setTimeout(async () => {
      setStatus('en ejecucion');
      setErrorMessage('');

      try {
        await saveFormData(formData);
        setStatus('exito');
        setIsDirty(false);

        // Retorna a 'inactivo' tras 3 segundos
        const resetTimer = setTimeout(() => {
          setStatus('inactivo');
        }, 3000);

        return () => clearTimeout(resetTimer);
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message);
      }
    }, 2000);

    // Limpieza técnica para evitar fugas de memoria y peticiones duplicadas
    return () => clearTimeout(timerId);
  }, [formData, isDirty]);

  return (
    <div className="container">
      <header>
        <h1>Laboratorio de Automatización en React</h1>
        <p className="subtitle">Módulo de Guardado Automático con Debounce</p>
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