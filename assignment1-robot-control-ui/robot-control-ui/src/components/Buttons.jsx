import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Buttons = ({ locked, onEmergencyStop, onStart }) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Button
        variant="contained"
        color={locked ? 'error' : 'success'}
        onClick={onEmergencyStop}
        sx={{
          width: {sm: '140px', md: '160px' },
          fontSize: {sm: '0.8rem', md: '1rem' },
          fontWeight: 'bold'
        }}
      >
        {locked ? '🔴 EMERGENCY STOP' : '🟢 EMERGENCY STOP'}
      </Button>
      <Button
        variant="contained"
        disabled={!locked}
        onClick={onStart}
        sx={{
          width: {sm: '140px', md: '160px' },
          fontSize: {sm: '0.8rem', md: '1rem' },
          fontWeight: 'bold',
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:disabled': {
            backgroundColor: '#aaa'
          }
        }}
      >
        Start
      </Button>
    </Stack>
  );
};

export default Buttons;
