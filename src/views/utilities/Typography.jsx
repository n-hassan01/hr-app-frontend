// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { useUser } from '../../../src/context/UserContext';

import Form from './Form';

export default function BasicExampleDataGrid() {
  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' }
  ];

  const handleSubmit = (data) => {
    console.log('Form Data:', data);
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
  };

  return (
    <>
      <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
        <Form fields={fields} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
