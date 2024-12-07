/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getUserData } from '../../context/UserContext';
import Form from '../utilities/Form';

// api services
import { addEvaluationForm, getCandidatesByDateService, getCandidatesService } from '../../services/ApiServices';

export default function EvaluationFormPage() {
  const user = getUserData();
  const [formData, setFormData] = useState({});

  const [selectedDate, setSelectedDate] = useState('');
  const [candidateList, setCandidateList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedDate) {
          const reponse = await getCandidatesByDateService(selectedDate);
          if (reponse.data.statusCode === 200) {
            setCandidateList(reponse.data.data);
          }
        } else {
          const reponse = await getCandidatesService(selectedDate);
          if (reponse.data.statusCode === 200) {
            setCandidateList(reponse.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [selectedDate]);
  console.log(candidateList);

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
    { label: 'Out of Marks', name: 'out_of_marks', type: 'number', placeholder: 'Out of Marks', defaultValue: 10 },
    { label: 'Average Marks', name: 'average_marks', type: 'number', placeholder: 'Average Marks', readOnly: true },
    { label: 'Performance', name: 'performance', type: 'text', placeholder: 'Enter Performance', readOnly: true },

    { label: 'Attire Body Language', name: 'attire_body_language', type: 'number', placeholder: 'Attire Body Language' },
    { label: 'Work Knowledge', name: 'work_knowledge', type: 'number', placeholder: 'Enter Work Knowledge' },
    { label: 'Team Player', name: 'team_player', type: 'number', placeholder: 'Team Player' },
    { label: 'Problem Solving Skill', name: 'problem_solving_skill', type: 'number', placeholder: 'Problem Solving Skill' },
    { label: 'Communication Skill', name: 'communication_skill', type: 'number', placeholder: 'Communication Skill' },
    { label: 'Total Marks', name: 'total_marks', type: 'number', placeholder: 'Total Marks', readOnly: true }
  ];

  const handleDateChange = (data) => {
    setSelectedDate(data);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const candidateOptions = candidateList
    .filter((option) => option.fullName.toLowerCase().includes(inputValue.toLowerCase()))
    .map((option) => ({ value: option.candidateNumber, label: option.fullName + ' ' + option.contactNumber }));

  const handleCandidateSelection = (selectedOption) => {
    setSelectedCandidate(selectedOption.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
        <div
          style={{
            flex: '1 1 calc(20% - 12px)',
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxSizing: 'border-box'
          }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'left' }}>Select interview date</label>
          <input
            type="date"
            name="interviewDate"
            onChange={(e) => handleDateChange(e.target.value)}
            style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <div
          style={{
            flex: '1 1 calc(20% - 12px)',
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxSizing: 'border-box'
          }}
        >
          <label style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'left' }}>Select candidate</label>
          <Select
            name="candidate"
            onChange={handleCandidateSelection}
            onInputChange={handleInputChange}
            options={candidateOptions}
            placeholder="Type to select a candidate..."
            isClearable
            style={{ padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <Form
        fields={fields}
        initialValues={formData} // Pass the form data, including calculated fields
        rowsConfig={[3, 3, 3]}
        onFormChange={handleFormChange} // Update calculations when inputs change
        onSubmit={handleSubmit} // Handle final submission
        resetAfterSubmit={true}
      />
    </div>
  );
}
