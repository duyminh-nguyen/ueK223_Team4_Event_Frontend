import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
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
            <Typography variant='h3'>
                Welcome to OurSpace
            </Typography>
            <Typography variant='body1' paragraph>
                Only for logged-in Users.
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/events');
                    }}>
                    Events
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/my-events');
                    }}>
                    My Events
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/users');
                    }}>
                    User
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        navigate('/admin');
                    }}>
                    Admin
                </Button>
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