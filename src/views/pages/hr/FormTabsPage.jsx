import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ApprovedStatusFormPage from './ApprovedStatusForm';
import CurrentStatusForm from './CurrentStatusForm';
import ExpectedStatusForm from './ExpectedStatusForm';

export default function FormTabsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CurrentStatusForm />;
      case 1:
        return <ExpectedStatusForm />;
      case 2:
        return <ApprovedStatusFormPage />;
    }
  };

  return (
    <>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ marginLeft: '16px' }}>
        <Tab label="Current Status" />
        <Tab label="Expected Status" />
        <Tab label="Approved Status" />
      </Tabs>
      <Box sx={{ padding: 2 }}>{renderTabContent()}</Box>
    </>
  );
}
