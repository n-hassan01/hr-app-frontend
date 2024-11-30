/* eslint-disable react/prop-types */
// import Button from './Button';

/* eslint-disable react/prop-types */
import { useState } from 'react';

const Form = ({ fields, onSubmit, formStyle = {}, rowsConfig = [] }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || '';
      return acc;
    }, {})
  );

  const handleChange = (name, value) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };

      // Recalculate "Out of Marks" dynamically if related fields are updated
      if (name === 'total_marks' || name === 'average_marks') {
        const totalMarks = parseFloat(updatedValues.total_marks) || 0;
        const averageMarks = parseFloat(updatedValues.average_marks) || 0;
        updatedValues.out_of_marks = totalMarks + averageMarks;
      }

      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const responsiveStyles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    row: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%'
    },
    field: {
      flex: '1 1 calc(33.333% - 15px)',
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxSizing: 'border-box'
    },
    label: {
      fontWeight: 'bold',
      fontSize: '14px',
      textAlign: 'left'
    },
    input: {
      padding: '10px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    value: {
      flex: '1',
      fontSize: '14px',
      color: '#333',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    button: {
      padding: '15px',
      marginTop: '15px',
      width: '100%',
      backgroundColor: '#5b2c6f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  };

  const groupFieldsByRows = (fields, rowsConfig) => {
    const groupedRows = [];
    let index = 0;

    rowsConfig.forEach((rowSize) => {
      const row = fields.slice(index, index + rowSize);
      groupedRows.push(row);
      index += rowSize;
    });

    if (index < fields.length) {
      groupedRows.push(fields.slice(index));
    }

    return groupedRows;
  };

  const groupedFields = groupFieldsByRows(fields, rowsConfig);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...responsiveStyles.form,
        ...formStyle
      }}
    >
      {groupedFields.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            ...responsiveStyles.row
          }}
        >
          {row.map((field, fieldIndex) => (
            <div
              key={fieldIndex}
              style={{
                ...responsiveStyles.field,
                flex: row.length === 1 ? '1 1 100%' : '1 1 calc(100% / ' + row.length + ' - 15px)'
              }}
            >
              <label style={responsiveStyles.label}>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={responsiveStyles.input}
                  required={field.required || false}
                >
                  <option value="" disabled>
                    {field.placeholder || 'Select an option'}
                  </option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.readOnly ? (
                <div style={responsiveStyles.value}>{formValues[field.name] || 'N/A'}</div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  placeholder={field.placeholder || ''}
                  required={field.required || false}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  style={responsiveStyles.input}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="submit" style={responsiveStyles.button}>
        Submit
      </button>
    </form>
  );
};

export default Form;
