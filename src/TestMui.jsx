import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextField } from '@mui/material';

const role_Type = [
  { label: 'Admin' },
  { label: 'Sub Admin' },
  { label: 'User' }
];

function RoleUpdateModal({ open, setOpen, setAutoComplete, autoComplete }) {
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_END_URL}admin/role/update/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
          },
          body: JSON.stringify({
            role: autoComplete?.label || '' // Use the selected role
          })
        }
      );

      const data = await response.json();
      console.log('Response:', data);

      // Optional: close modal or show success message
      handleClose();

    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          height: '300px',
          width: '500px',
          bgcolor: '#272626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 5,
          flexDirection: 'column',
          borderRadius: 2
        }}
      >
        <div className="modal-update flex flex-col gap-2 w-full">
          <Typography sx={{ width: '100%', fontSize: 20 }} component="h1">
            Update user information
          </Typography>

          <Autocomplete
            value={autoComplete}
            onChange={(event, newValue) => setAutoComplete(newValue)}
            disablePortal
            options={role_Type}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Change Role" />}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!autoComplete}
          >
            Change Role
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default RoleUpdateModal;
