/* eslint-disable no-unused-vars */
import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ApprovedStatusFormPage from './ApprovedFacilitiesForm';
import CurrentStatusForm from './CurrentFacilitiesForm';
import ExpectedStatusForm from './ExpectedFacilitiesForm';
import ExtraFacilitiesForm from './OtherFacilitiesForm';

export default function FormTabsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterDetails, setFilterDetails] = useState({ group: null, from: null });
  const [filteredGroupOptions, setFilteredGroupOptions] = useState([]);

  // Fetch group options from API
  const fetchGroupOptions = async () => {
    try {
      const response = await fetch('/api/group-options'); // Replace with your API endpoint
      const data = await response.json();
      const options = data.map((item) => ({
        value: item.id, // Replace with appropriate key from API data
        label: item.name // Replace with appropriate key from API data
      }));
      setFilteredGroupOptions(options);
    } catch (error) {
      console.error('Error fetching group options:', error);
    }
  };

  // Handle group selection change
  const handleGroupChange = (selectedOption) => {
    setFilterDetails((prev) => ({
      ...prev,
      group: selectedOption ? selectedOption.value : null
    }));
  };

  // Handle date change
  const onDateChange = (date, field) => {
    setFilterDetails((prev) => ({
      ...prev,
      [field]: date ? date.toISOString() : null
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGroupOptions();
  }, []);

  const renderTabContent = () => {
    const commonProps = { groupId: 5 }; // Pass groupId as a prop

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

  return (
    <>
      {/* Tabs */}
      <Tabs
        style={{ marginLeft: '20px' }}
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
      <Box sx={{ padding: 2 }}>{renderTabContent()}</Box>
    </>
  );
}
