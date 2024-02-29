import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import UserService from '../../../Services/UserService';
import { Event } from '../../../types/models/Event.model'; // Update import
import { User } from '../../../types/models/User.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group'; // Import group icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function EventPage() {
    const navigate = useNavigate();
    const context = useContext(ActiveUserContext);

    const handleAdd = () => {
        navigate('../addevent/');
    };

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await EventService.getEvents();
            setEvents(data);
        } catch (error) {
            setError('Error fetching events. Please try again later.');
            console.error('Error fetching events: ', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUsersForEvents = async () => {
        const eventsWithUsers: Event[] = [];

        for (const event of events) {
            if (event.owner) {
                try {
                    const user = await UserService.getUser(event.owner.id);
                    event.owner = user;
                } catch (error) {
                    setError('Error loading user data. Please try again later.');
                    console.error('Error loading user data: ', error);
                }
            }

            eventsWithUsers.push(event);
        }

        setEvents(eventsWithUsers);
    };

    useEffect(() => {
        if (context.user) {
            loadUsersForEvents();
        }
    }, [context.user]);

    function userCanEditEvent(event: Event, user: User) {
        if (event.owner) {
            return user.id === event.owner.id;
        }
        return false;
    }

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

    const handleEdit = (id: string) => {
        navigate('/editevent/' + id);
    };

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleExpandClick = (eventID: string) => {
        setExpanded(expanded === eventID ? false : eventID);
    };

    return (
        <div>
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

            <h1>My Events</h1>

            {loading && <p>Loading events...</p>}
            {error && <p>{error}</p>}
            {events.length === 0 && !loading && <p>You haven't created any events yet.</p>}
            
            <Box>
                <Grid container spacing={3}>
                    {events.map((event, index) => (
                        event.owner?.id === context.user?.id && (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Paper elevation={5} sx={{ padding: 2 }}>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <IconButton
                                            aria-expanded={expanded === event.id}
                                            onClick={() => handleExpandClick(event.id)}
                                            aria-label='show more'>
                                            <GroupIcon /> {/* Group icon */}
                                        </IconButton>
                                        <Typography variant="body2" align="right" sx={{ opacity: 0.6 }}>
                                            Owner: {event.owner?.firstName} {event.owner?.lastName}
                                        </Typography>
                                    </Grid>
                                    <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                        {new Date(event.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {event.name}
                                    </Typography> 
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                        <LocationOnIcon sx={{ opacity: 0.6, marginRight: '4px' }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                                            {event.location}
                                        </Typography>
                                    </div>
                                    <Box sx={{ bgcolor: 'background.paper', mt: 2, p: 2 }}>
                                        <Typography variant="body2">{event.description}</Typography>
                                    </Box>
                                    <Collapse in={expanded === event.id} timeout="auto" unmountOnExit>
                                        <Typography variant="h6" gutterBottom component="div">
                                            Guests
                                        </Typography>
                                        <ul>
                                            {event.guests &&
                                                event.guests.map((guest, guestIndex) => (
                                                    <li key={guestIndex}>
                                                        {guest.firstName} {guest.lastName}
                                                    </li>
                                                ))}
                                        </ul>
                                    </Collapse>
                                    {userCanEditEvent(event, context.user) && (
                                        <Button onClick={() => handleEdit(event.id)} size="small">
                                            Edit Event
                                        </Button>
                                    )}
                                    {userCanEditEvent(event, context.user) && (
                                        <Button onClick={() => deleteEvent(event.id)} size="small">
                                            Delete Event
                                        </Button>
                                    )}
                                </Paper>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
