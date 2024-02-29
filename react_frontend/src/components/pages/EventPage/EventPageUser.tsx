import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import { Event } from '../../../types/models/Event.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';

export default function EventPage() {
    // Hook for navigation
    const navigate = useNavigate();
    // Accessing user ID from URL parameters
    const { userId } = useParams();
    // Accessing active user context
    const context = useContext(ActiveUserContext);

    // Function to navigate to add event page
    const handleAdd = () => {
        navigate('/event/add');
    };

    // Function to navigate to edit event page
    const handleEdit = (id: string) => {
        navigate('/event/edit/' + id);
    };

    // Function to navigate to event details page
    const handleDetail = (id: string) => {
        navigate('/event/guests/' + id);
    };

    // State variables for managing events data, loading state, and error state
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load events data when component mounts or user ID changes
    useEffect(() => {
        setLoading(true);
        loadEvents();
    }, [userId]);

    // Function to fetch user's events from the server
    const loadEvents = async () => {
        try {
            const data = await EventService.getEvents();
            const userEvents = data.filter((event:Event) => event.owner?.id === context.user?.id);
            setEvents(userEvents);
        } catch (error) {
            setError('Error fetching events. Please try again later.');
            console.error('Error fetching events: ', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to check if user can edit an event
    const userCanEditEvent = (event: Event) => {
        return event.owner_id === userId;
    };

    // Function to delete an event
    const deleteEvent = async (id: string) => {
        try {
            await EventService.deleteEventById(id);
            loadEvents();
            console.log('Event successfully deleted');
        } catch (error) {
            setError('Error deleting event. Please try again later.');
            console.error('Error deleting event: ', error);
        }
    };

    return (
        <div>
            {/* Button to navigate to home */}
            <Button
                variant='contained'
                color='primary'
                onClick={() => {
                    navigate('/main');
                }}>
                Home
            </Button>
            {/* Button to add a new event */}
            <Button size="small" color="success" variant="contained" onClick={handleAdd}>
                Add
            </Button>{' '}

            {/* Title */}
            <h1>My Events</h1>

            {/* Display loading message while events are being fetched */}
            {loading && <p>Loading events...</p>}
            {/* Display error message if fetching events fails */}
            {error && <p>{error}</p>}
            {/* Display message if user hasn't created any events yet */}
            {events.length === 0 && !loading && <p>You haven't created any events yet.</p>}
            
            <Box>
                <Grid container spacing={3}>
                    {/* Map through user's events to render each event card */}
                    {events.map((event, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Paper elevation={5} sx={{ padding: 2 }}>
                                <Grid container alignItems="center" justifyContent="space-between">
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
                                </Grid>
                                {/* Display event date */}
                                <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                    {new Date(event.date).toLocaleDateString()}
                                </Typography>
                                {/* Display event name */}
                                <Typography variant="h5" component="div">
                                    {event.name}
                                </Typography> 
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                    {/* Display event location */}
                                    <LocationOnIcon sx={{ opacity: 0.6, marginRight: '4px' }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                        {event.location}
                                    </Typography>
                                </div>
                                {/* Display event description */}
                                <Box sx={{ bgcolor: 'background.paper', mt: 2, p: 2 }}>
                                    <Typography variant="body2">{event.description}</Typography>
                                </Box>
                                {/* Render edit and delete buttons if user can edit event */}
                                {userCanEditEvent(event) && (
                                    <Button onClick={() => handleEdit(event.id)} size="small">
                                        Edit Event
                                    </Button>
                                )}
                                {userCanEditEvent(event) && (
                                    <Button onClick={() => deleteEvent(event.id)} size="small">
                                        Delete Event
                                    </Button>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
