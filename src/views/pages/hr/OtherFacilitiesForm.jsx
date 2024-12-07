/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { getUserData } from '../../../context/UserContext';
import { addEvaluationForm } from '../../../services/ApiServices';
import Form from '../../utilities/Form';

export default function OtherFacilitiesForm() {
  const user = getUserData();
  const [formData, setFormData] = useState({});

  // Calculate derived fields when form data changes
  //   const calculateDerivedFields = (data) => {
  //     const fieldsToSum = ['attire_body_language', 'work_knowledge', 'team_player', 'problem_solving_skill', 'communication_skill'];

  //     const totalMarks = fieldsToSum.reduce((total, field) => total + (parseFloat(data[field]) || 0), 0);
  //     const performance =
  //       totalMarks >= 45 ? 'Outstanding' : totalMarks >= 31 ? 'Good' : totalMarks >= 23 ? 'Average' : totalMarks >= 17 ? 'Fair' : 'Poor';

  //     return {
  //       ...data,
  //       total_marks: totalMarks,
  //       average_marks: totalMarks / fieldsToSum.length,
  //       performance
  //     };
  //   };

  //   const getCandidateData = async (data) => {
  //     const { date_of_evaluation } = data;

  //     // Log the date_of_evaluation and the calculated values
  //     console.log('Date of Evaluation:', date_of_evaluation);

  //     const response = await getCandidateList(date_of_evaluation);
  //     console.log(response);

  //     if (response.status === 200) {
  //       alert('Data Saved Successfully');
  //     } else {
  //       alert('Process failed! Try again');
  //     }
  //     return {
  //       response
  //     };
  //   };

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
    { label: 'Notice Period', name: 'noticePeriod', type: 'text', placeholder: 'Enter Notice Period' },
    { label: 'DOJ', name: 'doj', type: 'text', placeholder: 'Enter DOJ' },
    { label: 'Prob. Period', name: 'probPeriod', type: 'text', placeholder: 'Enter Prob. Period' },
    { label: 'Investigation', name: 'investigation', type: 'text', placeholder: 'Enter Investigation' },
    { label: 'HR Note(if any) :', name: 'hrNote', type: 'textarea', placeholder: 'Enter HR Note' },
    {
      label: 'Management Comments :',
      name: 'managementComments',
      type: 'textarea',
      placeholder: 'Enter Management Comments ',
      readOnly: true
    }
  ];

  return (
    <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
      <Form
        fields={fields}
        initialValues={formData} // Pass the form data, including calculated fields
        rowsConfig={[4, 1, 1]}
        onFormChange={handleFormChange} // Update calculations when inputs change
        onSubmit={handleSubmit} // Handle final submission
        resetAfterSubmit={true}
      />
    </div>
  );
}
