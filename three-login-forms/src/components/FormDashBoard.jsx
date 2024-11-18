import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import ADHDForm from './adhdform';
import DASSForm from './dassform';

const FormDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="ADHD Form" />
          <Tab label="DASS Form" />
        </Tabs>

        <Box>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                ADHD Form
              </Typography>
              <ADHDForm />
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                DASS Form
              </Typography>
              <DASSForm />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FormDashboard;
