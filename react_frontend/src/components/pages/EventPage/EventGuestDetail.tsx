import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import { Event } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

// Component for displaying event guest details
const EventGuestDetail = () => {
    // Accessing event ID from URL parameters
    const { eventId } = useParams<{ eventId: string }>();
    // State variables for managing event and guest data, pagination, and loading state
    const [event, setEvent] = useState<Event | null>(null);
    const [guests, setGuests] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch event and guests data when component mounts or page changes
    useEffect(() => {
        const fetchEventAndGuests = async () => {
            try {
                setLoading(true);
                if (eventId) { 
                    // Fetch event details
                    const eventData = await EventService.getEventById(eventId);
                    setEvent(eventData);
                    // Fetch guests for the event with pagination
                    const response = await EventService.getEventGuests(eventId, page, 10);
                    setGuests(response.data.content);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching event: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventAndGuests();
    }, [eventId, page]);

    // Function to handle pagination page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            {/* Display loading indicator while data is being fetched */}
            {loading && <CircularProgress />}
            {/* Display event details and guests */}
            {event && (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Event Name: {event.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Guests
                    </Typography>
                    <ul>
                        {/* Map through guests to display each guest */}
                        {guests.map((guest: User, index: number) => (
                            <li key={index}>
                                {guest.firstName} {guest.lastName} - {guest.email}
                            </li>
                        ))}
                    </ul>
                    {/* Pagination component for navigating through guests */}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default EventGuestDetail;
