/* eslint-disable react/prop-types */

const Form = ({ fields, onSubmit, formStyle = {}, buttonLabel = 'Submit' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  // Media query styles
  const responsiveStyles = {
    form: {
      maxWidth: '500px',
      width: '90%',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxSizing: 'border-box'
    },
    field: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    input: {
      padding: '10px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    button: {
      padding: '12px 20px',
      marginTop: '15px',
      width: '100%',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    '@media (max-width: 768px)': {
      form: {
        padding: '10px'
      },
      label: {
        fontSize: '12px'
      },
      button: {
        fontSize: '14px'
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...responsiveStyles.form,
        ...formStyle
      }}
    >
      {fields.map((field, index) => (
        <div key={index} style={responsiveStyles.field}>
          <label style={responsiveStyles.label}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder || ''}
            required={field.required || false}
            style={{
              ...responsiveStyles.input,
              ...field.style
            }}
          />
        </div>
      ))}
      <button type="submit" style={responsiveStyles.button}>
        {buttonLabel}
      </button>
    </form>
  );
};

export default Form;
