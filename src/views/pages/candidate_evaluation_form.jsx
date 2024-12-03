/* eslint-disable no-unused-vars */
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { getUserData } from '../../context/UserContext';
import { addEvaluationForm, getSubmittedByUser } from '../../services/ApiServices';
import Form from '../utilities/Form';

export default function EvaluationFormPage() {
  // Get user data (token, username)
  // Pass user.token for getting user
  const user = getUserData();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  // get login user info api
  // Pass user.token for getting user
  const [getLoginUserInfo, setLoginUserInfo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let response = {};
        if (user) response = await getSubmittedByUser(user.token);
        console.log(response);

        if (response.status === 200) setLoginUserInfo(response.data.data.userId);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);
  console.log(getLoginUserInfo);

  // get all evaluations api calling
  // const [evaluationsAll, setEvaluationsAll] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       let response = {};
  //       if (user) response = await getEvaluationforAll(user);
  //       if (response.status === 200) setEvaluationsAll(response.data);
  //     } catch (error) {
  //       console.error('Error fetching account details:', error);
  //     }
  //   }

  //   fetchData();
  // }, [user]);
  // console.log(evaluationsAll);

  // Adding evaluation data
  const handleSubmit = async (data) => {
    console.log('Form Data:', data);

    const requestBody = {
      key: {
        candidateNumber: 1,
        submittedBy: getLoginUserInfo
      },
      submittedDate: new Date(),
      attireBodyLanguage: data.attire_body_language,
      workKnowledge: data.work_knowledge,
      teamPlayer: data.team_player,
      problemSolvingSkill: data.problem_solving_skill,
      communicationSkill: data.communication_skill,
      outOfMarks: data.out_of_marks,
      totalMarks: data.total_marks,
      avgMarks: data.average_marks,
      performance: data.performance
    };

    console.log('Request Body:', requestBody);

    try {
      const response = await addEvaluationForm(requestBody, user.token);
      if (response.status === 200) {
        setAlertMessage('Data Saved Successfully');
        setAlertSeverity('success');
        setTimeout(() => {
          setAlertMessage('');
        }, 1000);
      } else {
        setAlertMessage('Process failed! Try again');
        setAlertSeverity('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('An error occurred! Please try again.');
      setAlertSeverity('error');
    }
  };

  const fields = [
    {
      label: 'Candidate Number',
      name: 'candidate_number',
      type: 'select',
      options: [
        { value: 'Select Any Option', label: 'Select Any Option' },
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
    <>
      {alertMessage && (
        <Alert variant="filled" severity={alertSeverity}>
          {alertMessage}
        </Alert>
      )}
      <div style={{ padding: '0', width: '80vw', height: '100vh', margin: '0' }}>
        <Form
          fields={fields}
          rowsConfig={[2, 3, 3, 2]}
          onSubmit={handleSubmit}
          resetAfterSubmit={true} // Ensures the form resets after a successful submission
        />
      </div>
    </>
  );
}
