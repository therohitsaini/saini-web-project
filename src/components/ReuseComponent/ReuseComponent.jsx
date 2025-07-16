// components/GradientButton.js

import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const GradientButton = ({ loading, onClick, children, ...props }) => {
    return (
        <Button
            onClick={onClick}
            disabled={loading}
            variant="contained"
            sx={{
                textTransform: 'none',
                minWidth: '200px',
                backgroundImage: loading
                    ? 'none'
                    : 'linear-gradient(to right, #1e3a8a, #9333ea)',
                backgroundColor: loading ? '#c2c2c2' : undefined,
                color: 'white',
                '&:hover': {
                    backgroundImage: loading
                        ? 'none'
                        : 'linear-gradient(to right, #1e40af, #7c3aed)',
                    backgroundColor: loading ? '#c2c2c2' : undefined,
                },
            }}
            {...props}
        >
            {loading ? (
                <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
            ) : (
                children
            )}
        </Button>
    );
};

export default GradientButton;
