import React, { useContext, useEffect } from 'react';
import ActiveUserContext from '../../Contexts/ActiveUserContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Component for displaying details of a single user
const SingleUserPage: React.FC = () => {
    // Accessing user data and loading function from context
    const { user, loadActiveUser } = useContext(ActiveUserContext);
    // Hook for navigation
    const navigate = useNavigate();

    // Load active user when component mounts or user changes
    useEffect(() => {
        if (!user) {
            loadActiveUser();
        }
    }, [user, loadActiveUser]);

    return (
        <div>
            {/* Button to navigate to home */}
            <Button
                variant='contained' color='primary'
                onClick={() => {
                    navigate('/main');
                }}>
                Home
            </Button>
            {/* Title */}
            <h2>Account</h2>
            {/* Display user information if logged in */}
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>E-Mail: {user.email}</p>
                    {/* Display user roles */}
                    <h3>Roles:</h3>
                    <ul>
                        {user.roles.map((role) => (
                            <li key={role.id}>{role.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                // Display message if not logged in
                <p>Not Logged In.</p>
            )}
        </div>
    );
};

export default SingleUserPage;
