/* eslint-disable no-unused-vars */
import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import ApprovedStatusFormPage from './ApprovedFacilitiesForm';
import CurrentStatusForm from './CurrentFacilitiesForm';
import ExpectedStatusForm from './ExpectedFacilitiesForm';
import ExtraFacilitiesForm from './OtherFacilitiesForm';

// api services
import { getCandidatesByDateService, getCandidatesService } from '../../../services/ApiServices';

export default function FormTabsPage() {
  const [activeTab, setActiveTab] = useState(0);

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

  const renderTabContent = () => {
    const commonProps = { candidateNumber: selectedCandidate }; // Pass groupId as a prop

    switch (activeTab) {
      case 0:
        return <CurrentStatusForm {...commonProps} />;
      case 1:
        return <ExpectedStatusForm {...commonProps} />;
      case 2:
        return <ApprovedStatusFormPage {...commonProps} />;
      case 3:
        return <ExtraFacilitiesForm {...commonProps} />;
      default:
        return null;
    }
  };

  // datewise candidate selection
  const handleDateChange = (data) => {
    setSelectedDate(data);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const candidateOptions = candidateList
    .filter((option) => option?.fullName?.toLowerCase().includes(inputValue?.toLowerCase() || ''))
    .map((option) => ({
      value: option?.candidateNumber || null,
      label: `${option?.fullName || ''} ${option?.contactNumber || ''}`.trim()
    }));

  const handleCandidateSelection = (selectedOption) => {
    console.log(selectedOption);
    setSelectedCandidate(selectedOption.value);
  };

  return (
    <>
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

      <Tabs
        style={{
          marginLeft: '20px',
          display: selectedCandidate ? 'block' : 'none'
        }}
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ marginBottom: '20px' }}
      >
        <Tab label="Current" />
        <Tab label="Expected" />
        <Tab label="Approved" />
        <Tab label="Others" />
      </Tabs>

      {/* Tab Content */}
      <Box
        sx={{ padding: 2 }}
        style={{
          display: selectedCandidate ? 'block' : 'none'
        }}
      >
        {renderTabContent()}
      </Box>
    </>
  );
}
