// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { useUser } from '../../../src/context/UserContext';

import Form from '../utilities/Form';

export default function BasicExampleDataGrid() {
  const fields = [
    {
      label: 'Customer Number',
      name: 'customer_number',
      type: 'select',
      options: [
        { value: '', label: 'Select your customer' },
        { value: 'customer1', label: 'Customer 1' },
        { value: 'Customer2', label: 'Customer 2' },
        { value: 'Customer2', label: 'Customer 3' }
      ]
    },
    { label: 'Attire Body Language', name: 'attire_body_language', type: 'number', placeholder: 'Attire Body Language' },
    { label: 'Work Knowledge', name: 'work_knowledge', type: 'number', placeholder: 'Enter Work Knowledge' },
    { label: 'Team Player', name: 'team_player', type: 'number', placeholder: 'Team Player' },
    { label: 'Problem Solving Skill', name: 'problem_solving_skill', type: 'number', placeholder: 'Problem Solving Skill' },
    { label: 'Communication Skill', name: 'communication_skill', type: 'number', placeholder: 'Communication Skill' },
    { label: 'Out of Marks', name: 'out_of_marks', type: 'number', placeholder: 'Out of Marks' },
    { label: 'Total Marks', name: 'total_marks', type: 'number', placeholder: 'Total Marks' },
    { label: 'Average Marks', name: 'average_marks', type: 'number', placeholder: 'Average Marks' },
    { label: 'Performance', name: 'performance', type: 'text', placeholder: 'Enter Performance' }

    // {
    //   label: 'Role',
    //   name: 'role',
    //   type: 'select',
    //   options: [
    //     { value: '', label: 'Select your role' },
    //     { value: 'admin', label: 'Admin' },
    //     { value: 'editor', label: 'Editor' },
    //     { value: 'viewer', label: 'Viewer' }
    //   ]
    // }
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
