import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Component for the main page
const MainPage = () => {
    // Hook for navigation
    const navigate = useNavigate();
    // Retrieving user data from local storage
    const userJSON = localStorage.getItem("user");
    const user = userJSON ? JSON.parse(userJSON) : null;
  
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
            <Typography variant='h3'>
                Welcome to OurSpace
            </Typography>
            {/* Description */}
            <Typography variant='body1' paragraph>
                Only for logged-in Users.
            </Typography>
            {/* Buttons for navigating to different pages */}
            <Box display="flex" justifyContent="center" gap={2}>
                {/* Button to navigate to Events page */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/event');
                    }}>
                    Events
                </Button>
                {/* Button to navigate to My Events page */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/my-events/' + user.id);
                    }}>
                    My Events
                </Button>
                {/* Button to navigate to User page */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/users');
                    }}>
                    User
                </Button>
                {/* Button to navigate to Admin page */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/admin');
                    }}>
                    Admin
                </Button>
                {/* Button to navigate to My Account page */}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/account');
                    }}>
                    My Account
                </Button>
            </Box>
        </Box>
    );
}

export default MainPage;
