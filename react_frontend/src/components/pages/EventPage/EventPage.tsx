import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import { Event } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';

export default function EventPage() {
    // Hook to enable navigation
    const navigate = useNavigate();
    // Accessing active user context
    const context = useContext(ActiveUserContext);

    // Function to navigate to add event page
    const handleAdd = () => {
        navigate('/event/add');
    };

    // Function to navigate to event details page
    const handleDetail = (id: string) => {
        navigate('/event/guests/' + id);
    };

    // State variables for managing events data, loading state, and error state
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load events data when the component mounts
    useEffect(() => {
        loadEvents();
    }, []);

    // Function to fetch events data from the server
    const loadEvents = async () => {
        try {
            const data = await EventService.getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events: ', error);
        }
    };

    return (
        <div>
            {/* Buttons to navigate to home and add event */}
            <Button
                variant='contained'
                color='primary'
                onClick={() => {
                    navigate('/main');
                }}>
                Home
            </Button>
            <Button size="small" color="success" variant="contained" onClick={handleAdd}>
                Add
            </Button>{' '}
            {/* Heading for the page */}
            <h1>All Events</h1>

            {/* Display loading message while events are being fetched */}
            {loading && <p>Loading events...</p>}
            {/* Display error message if fetching events fails */}
            {error && <p>{error}</p>}
            {/* Display message if no events are found */}
            {events.length === 0 && !loading && <p>No Events Found.</p>}

            {/* Grid to display event cards */}
            <Box>
                <Grid container spacing={3}>
                    {/* Map through events array to render each event card */}
                    {events.map((event, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Paper elevation={5} sx={{ padding: 2 }}>
                                {/* Button to navigate to event details */}
                                <IconButton
                                    onClick={() => handleDetail(event.id)}
                                    aria-label='show more'>
                                    <GroupIcon />
                                </IconButton>
                                {/* Display event owner's name */}
                                <Typography variant="body2" align="right" sx={{ opacity: 0.6 }}>
                                    Owner: {event.owner.firstName} {event.owner.lastName}
                                </Typography>
                                {/* Display event date */}
                                <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                    {new Date(event.date).toLocaleDateString()}
                                </Typography>
                                {/* Display event name */}
                                <Typography variant="h5" component="div">
                                    {event.name}
                                </Typography> 
                                {/* Display event location */}
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                    <LocationOnIcon sx={{ opacity: 0.6, marginRight: '4px' }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                        {event.location}
                                    </Typography>
                                </div>
                                {/* Display event description */}
                                <Box sx={{ bgcolor: 'background.paper', mt: 2, p: 2 }}>
                                    <Typography variant="body2">{event.description}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
