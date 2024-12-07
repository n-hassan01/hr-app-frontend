/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { getUserData } from '../../../context/UserContext';
import { addEvaluationForm, getCandidateList } from '../../../services/ApiServices';
import Form from '../../utilities/Form';

export default function CurrentStatusForm({ groupId }) {
  console.log(groupId);

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
    { label: 'Company', name: 'company', type: 'text', placeholder: 'Company Name', readOnly: true },
    { label: 'SBU', name: 'sbu', type: 'text', placeholder: 'SBU', readOnly: true },
    { label: 'Department', name: 'department', type: 'text', placeholder: 'Department Name', readOnly: true },
    { label: 'Reports to', name: 'reportsTo', type: 'text', placeholder: 'ReportsTo Name', readOnly: true },
    { label: 'Designation', name: 'designation', type: 'text', placeholder: 'Designation Name', readOnly: true },
    { label: 'Salary', name: 'salary', type: 'number', placeholder: 'Salary ', readOnly: true },
    { label: 'Bonus', name: 'bonus', type: 'text', placeholder: 'Bonus ', readOnly: true },
    { label: 'TA/Conveyance', name: 'taOrConveyance', type: 'text', placeholder: 'Ta/Conveyance', readOnly: true },
    { label: 'DA/Food', name: 'daOrFood', type: 'text', placeholder: 'DA/Food', readOnly: true },
    {
      label: 'Benefit/Allowance',
      name: 'benefitOrAllowance',
      type: 'text',
      placeholder: 'Benefit/Allowance',
      readOnly: true
    },
    { label: 'PF/Gratuity', name: 'pfOrGratuity', type: 'text', placeholder: 'PF/Gratuity', readOnly: true },
    {
      label: 'Transport Facility',
      name: 'transportFacility',
      type: 'text',
      placeholder: 'Transport Facility',
      readOnly: true
    },
    { label: 'Incentive/Kpi', name: 'incentiveOrKpi', type: 'text', placeholder: 'Incentive/Kpi', readOnly: true },
    { label: 'Mobile Ceiling', name: 'mobileCeiling', type: 'text', placeholder: 'Mobile Ceiling', readOnly: true },
    { label: 'Total Ctc', name: 'totalCtc', type: 'text', placeholder: 'Total Ctc', readOnly: true }
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
