
export const StatusBadge = ({ status, errorMessage }) => {
  const getStatusContent = () => {
    switch (status) {
      case 'en ejecucion':
        return <span className="status executing">⏳ Guardando automáticamente...</span>;
      case 'exito':
        return <span className="status success">✅ Cambios guardados correctamente</span>;
      case 'error':
        return <span className="status error">❌ Error al guardar: {errorMessage}</span>;
      case 'inactivo':
      default:
        return <span className="status idle">⚪ Todos los cambios al día</span>;
    }
  };

  return <div className="status-container">{getStatusContent()}</div>;
};