/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { getUserData } from '../../../context/UserContext';
import { addEvaluationForm, getCandidateList } from '../../../services/ApiServices';
import Form from '../../utilities/Form';

export default function ExpectedStatusForm() {
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

  const getCandidateData = async (data) => {
    const { date_of_evaluation } = data;

    // Log the date_of_evaluation and the calculated values
    console.log('Date of Evaluation:', date_of_evaluation);

    const response = await getCandidateList(date_of_evaluation);
    console.log(response);

    if (response.status === 200) {
      alert('Data Saved Successfully');
    } else {
      alert('Process failed! Try again');
    }
    return {
      response
    };
  };

  const handleFormChange = async (data) => {
    console.log(data);

    // const updatedData = calculateDerivedFields(data); // Calculate derived fields
    // const candidateData = getCandidateData(data); // Update state with new data
    // console.log(candidateData);
  };
  console.log(formData);

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
    { label: 'Company', name: 'company', type: 'text', placeholder: 'Enter Company Name' },
    { label: 'SBU', name: 'sbu', type: 'text', placeholder: 'Enter SBU' },
    { label: 'Department', name: 'department', type: 'text', placeholder: 'Enter Department Name' },
    { label: 'Reports to', name: 'reportsTo', type: 'text', placeholder: 'Enter ReportsTo Name' },
    { label: 'Designation', name: 'designation', type: 'text', placeholder: 'Enter Designation Name' },
    { label: 'Salary', name: 'salary', type: 'number', placeholder: 'Enter Salary ' },
    { label: 'Bonus', name: 'bonus', type: 'text', placeholder: 'Enter Bonus ' },
    { label: 'TA/Conveyance', name: 'taOrConveyance', type: 'text', placeholder: 'Enter Ta/Conveyance' },
    { label: 'DA/Food', name: 'daOrFood', type: 'text', placeholder: 'Enter DA/Food' },
    {
      label: 'Benefit/Allowance',
      name: 'benefitOrAllowance',
      type: 'text',
      placeholder: 'Enter Benefit/Allowance'
    },
    { label: 'PF/Gratuity', name: 'pfOrGratuity', type: 'text', placeholder: 'Enter PF/Gratuity' },
    { label: 'Transport Facility', name: 'transportFacility', type: 'text', placeholder: 'Enter Transport Facility' },
    { label: 'Incentive/Kpi', name: 'incentiveOrKpi', type: 'text', placeholder: 'Enter Incentive/Kpi' },
    { label: 'Mobile Ceiling', name: 'mobileCeiling', type: 'text', placeholder: 'Enter Mobile Ceiling' },
    { label: 'Total Ctc', name: 'totalCtc', type: 'text', placeholder: 'Enter Total Ctc' }
  ];

  return (
    <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
      <Form
        fields={fields}
        initialValues={formData} // Pass the form data, including calculated fields
        rowsConfig={[3, 3, 3, 3, 3]}
        onFormChange={handleFormChange} // Update calculations when inputs change
        onSubmit={handleSubmit} // Handle final submission
        resetAfterSubmit={true}
      />
    </div>
  );
}
