/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { getUserData } from '../../../context/UserContext';
import { addEvaluationForm } from '../../../services/ApiServices';
import Form from '../../utilities/Form';

export default function EvaluationFormPage() {
  const user = getUserData();
  const [formData, setFormData] = useState({});

  // Calculate derived fields when form data changes
  const calculateDerivedFields = (data) => {
    const fieldsToSum = ['attire_body_language', 'work_knowledge', 'team_player', 'problem_solving_skill', 'communication_skill'];

    const totalMarks = fieldsToSum.reduce((total, field) => total + (parseFloat(data[field]) || 0), 0);
    const performance =
      totalMarks >= 45 ? 'Outstanding' : totalMarks >= 31 ? 'Good' : totalMarks >= 23 ? 'Average' : totalMarks >= 17 ? 'Fair' : 'Poor';

    return {
      ...data,
      total_marks: totalMarks,
      average_marks: totalMarks / fieldsToSum.length,
      performance
    };
  };

  const handleFormChange = (data) => {
    const updatedData = calculateDerivedFields(data); // Calculate derived fields
    setFormData(updatedData); // Update state with new data
  };

  const handleSubmit = async (data) => {
    console.log('Submitted Data:', data);

    const requestBody = {
      key: { candidateNumber: 1, submittedBy: user?.id },
      submittedDate: new Date(),
      ...data
    };

    try {
      const response = await addEvaluationForm(requestBody, user.token);
      if (response.status === 200) {
        alert('Data Saved Successfully');
      } else {
        alert('Process failed! Try again');
      }
    } catch (error) {
      alert('An error occurred! Please try again.');
    }
  };

  const fields = [
    {
      label: 'Candidate Number',
      name: 'candidate_number',
      type: 'select',
      options: [
        { value: '', label: 'Select Any Option' },
        { value: 'candidate1', label: 'Candidate 1' },
        { value: 'candidate2', label: 'Candidate 2' },
        { value: 'candidate3', label: 'Candidate 3' }
      ]
    },
    { label: 'Out of Marks', name: 'out_of_marks', type: 'number', placeholder: 'Out of Marks', defaultValue: 10 },
    { label: 'Attire Body Language', name: 'attire_body_language', type: 'number', placeholder: 'Attire Body Language' },
    { label: 'Work Knowledge', name: 'work_knowledge', type: 'number', placeholder: 'Enter Work Knowledge' },
    { label: 'Team Player', name: 'team_player', type: 'number', placeholder: 'Team Player' },
    { label: 'Problem Solving Skill', name: 'problem_solving_skill', type: 'number', placeholder: 'Problem Solving Skill' },
    { label: 'Communication Skill', name: 'communication_skill', type: 'number', placeholder: 'Communication Skill' },
    { label: 'Total Marks', name: 'total_marks', type: 'number', placeholder: 'Total Marks', readOnly: true },
    { label: 'Performance', name: 'performance', type: 'text', placeholder: 'Enter Performance', readOnly: true },
    { label: 'Average Marks', name: 'average_marks', type: 'number', placeholder: 'Average Marks', readOnly: true }
  ];

  return (
    <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
      <Form
        fields={fields}
        initialValues={formData} // Pass the form data, including calculated fields
        rowsConfig={[2, 3, 3, 2]}
        onFormChange={handleFormChange} // Update calculations when inputs change
        onSubmit={handleSubmit} // Handle final submission
        resetAfterSubmit={true}
      />
    </div>
  );
}
