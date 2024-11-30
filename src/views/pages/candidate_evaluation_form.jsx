/* eslint-disable no-unused-vars */
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

import { getUserData } from '../../context/userContext';
import Form from '../utilities/Form';

export default function BasicExampleDataGrid() {
  // For getting user data use this function just.
  const user = getUserData();

  const fields = [
    {
      label: 'Customer Number',
      name: 'customer_number',
      type: 'select',
      options: [
        { value: 'Select Any Option', label: 'Select Any Option' },
        { value: 'customer1', label: 'Customer 1' },
        { value: 'Customer2', label: 'Customer 2' },
        { value: 'Customer2', label: 'Customer 3' }
      ]
    },
    { label: 'Out of Marks', name: 'out_of_marks', type: 'number', placeholder: 'Out of Marks', readOnly: true },
    { label: 'Performance', name: 'performance', type: 'text', placeholder: 'Enter Performance' },
    { label: 'Attire Body Language', name: 'attire_body_language', type: 'number', placeholder: 'Attire Body Language' },
    { label: 'Work Knowledge', name: 'work_knowledge', type: 'number', placeholder: 'Enter Work Knowledge' },
    { label: 'Team Player', name: 'team_player', type: 'number', placeholder: 'Team Player' },
    { label: 'Problem Solving Skill', name: 'problem_solving_skill', type: 'number', placeholder: 'Problem Solving Skill' },
    { label: 'Communication Skill', name: 'communication_skill', type: 'number', placeholder: 'Communication Skill' },
    { label: 'Total Marks', name: 'total_marks', type: 'number', placeholder: 'Total Marks' },
    { label: 'Average Marks', name: 'average_marks', type: 'number', placeholder: 'Average Marks' }
  ];

  const handleSubmit = (data) => {
    console.log('Form Data:', data);
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
  };

  return (
    <>
      <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
        <Form fields={fields} rowsConfig={[2, 3, 3, 2]} onSubmit={handleSubmit} />
      </div>
    </>
  );
}
