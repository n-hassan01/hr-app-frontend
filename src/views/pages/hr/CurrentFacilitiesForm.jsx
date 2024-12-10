/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getUserData } from '../../../context/UserContext';
import { getCandidateFacilitiesByCandidateInfoService } from '../../../services/ApiServices';
import Form from '../../utilities/Form';

export default function CurrentStatusForm({ candidateNumber }) {
  console.log(candidateNumber);

  const user = getUserData();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          candidateNumber: candidateNumber
        };

        const reponse = await getCandidateFacilitiesByCandidateInfoService(requestBody, 'CURRENT');
        if (reponse.data?.statusCode === 200) {
          setFormData(reponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [candidateNumber]);
  console.log(formData);

  const handleFormChange = async (data) => {
    console.log(data);
  };

  const handleSubmit = async (data) => {
    console.log('Submitted Data:', data);
  };

  const fields = [
    { label: 'Company', name: 'company', type: 'text', readOnly: true },
    { label: 'SBU', name: 'sbu', type: 'text', readOnly: true },
    { label: 'Department', name: 'department', type: 'text', readOnly: true },
    { label: 'Reports to', name: 'reportsTo', type: 'text', readOnly: true },
    { label: 'Designation', name: 'designation', type: 'text', readOnly: true },
    { label: 'Salary', name: 'salary', type: 'number', readOnly: true },
    { label: 'Bonus', name: 'bonus', type: 'text', readOnly: true },
    { label: 'TA/Conveyance', name: 'taOrConveyance', type: 'text', readOnly: true },
    { label: 'DA/Food', name: 'daOrFood', type: 'text', readOnly: true },
    {
      label: 'Benefit/Allowance',
      name: 'benefitOrAllowance',
      type: 'text',
      readOnly: true
    },
    { label: 'PF/Gratuity', name: 'pfOrGratuity', type: 'text', readOnly: true },
    {
      label: 'Transport Facility',
      name: 'transportFacility',
      type: 'text',
      readOnly: true
    },
    { label: 'Incentive/Kpi', name: 'incentiveOrKpi', type: 'text', readOnly: true },
    { label: 'Mobile Ceiling', name: 'mobileCeiling', type: 'text', readOnly: true },
    { label: 'Total Ctc', name: 'totalCtc', type: 'text', readOnly: true }
  ];

  return (
    <div>
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
