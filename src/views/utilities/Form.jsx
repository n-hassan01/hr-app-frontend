/* eslint-disable react/prop-types */
import Button from './Button';

const Form = ({ fields, onSubmit, formStyle = {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  const responsiveStyles = {
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      width: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      boxSizing: 'border-box'
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 calc(25% - 15px)',
      boxSizing: 'border-box'
    },
    label: {
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
    select: {
      padding: '10px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    button: {
      padding: '10px 20px',
      marginTop: '15px',
      width: '100%',
      maxWidth: '100%',
      backgroundColor: '#5b2c6f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <>
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
            {field.type === 'select' ? (
              <select name={field.name} style={responsiveStyles.select} required={field.required || false}>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
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
            )}
          </div>
        ))}
      </form>
      <Button label="Submit" onClick={() => alert('Button clicked!')} style={responsiveStyles.button} />
    </>
  );
};

export default Form;
