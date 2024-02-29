import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Component for the home page
const HomePage = () => {
    // Hook for navigation
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            {/* Title */}
            <Typography variant='h3' >
                OurSpace
            </Typography>
            {/* Description */}
            <Typography variant='body1' paragraph>
                Create Events with OurSpace Today!
            </Typography>
            {/* Button to navigate to login */}
            <Button variant='contained' color='primary'
                    onClick={() => {
                        navigate('/login');
                    }}>
                Get Started
            </Button>

        </Box>
    );
}

export default HomePage;
