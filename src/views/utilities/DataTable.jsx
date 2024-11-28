import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
// import { useUser } from '../../../src/context/UserContext';
import Button from './Button';
import Form from './Form';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function BasicExampleDataGrid() {
  // const { user } = useUser();
  // console.log(user);
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100
  });
  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name', required: true },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password', required: true },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age' }
  ];

  const handleSubmit = (data) => {
    console.log('Form Data:', data);
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
  };

  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
      </div>
      <div>
        <Button
          label="Click Me"
          onClick={handleClick}
          style={{ padding: '10px 20px', backgroundColor: '#5b2c6f', color: 'white', border: 'none', borderRadius: '5px' }}
        />
      </div>

      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Form</h1>
        <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Register" />
      </div>
    </>
  );
}

/* eslint-disable react/prop-types */
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// const DataTable = ({ columns, rows, height = 400 }) => {
//   return (
//     <div style={{ height, width: '100%' }}>
//       <DataGrid columns={columns} rows={rows} slots={{ toolbar: GridToolbar }} pageSizeOptions={[5, 10, 20]} pagination />
//     </div>
//   );
// };

// export default DataTable;
