import React from 'react';
import Button from '@mui/material/Button';

const Buttons = ({ locked, onEmergencyStop, onStart }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Button
          variant="contained"
          color={locked ? 'error' : 'success'}
          onClick={onEmergencyStop}
          sx={{ width: '160px', fontWeight: 'bold' }}
        >
          {locked ? '🔴 EMERGENCY STOP' : '🟢  EMERGENCY STOP'}
        </Button>
        <Button
          variant="contained"
          disabled={!locked}
          onClick={onStart}
          sx={{
            width: '160px',
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: 'bold',
            '&:disabled': {
              backgroundColor: '#aaa'
            }
          }}
        >
          Start
        </Button>
      </div>
    );
  };
  
  export default Buttons;
