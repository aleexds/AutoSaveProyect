export const FormField = ({ label, name, value, onChange, type = "text", isTextArea = false }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={`Ingrese ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Ingrese ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
};