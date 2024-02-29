import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import { Event } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import Pagination from '@mui/material/Pagination';

const EventGuestDetail = () => {
    const { eventId } = useParams<{ eventId?: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [guests, setGuests] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEventAndGuests = async () => {
            try {
                if (eventId) { 
                    const eventData = await EventService.getEventById(eventId);
                    setEvent(eventData);
                }
            } catch (error) {
                console.error('Error fetching event: ', error);
            }
        };
        fetchEventAndGuests();
    }, [eventId]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                if (eventId) { 
                    const response = await EventService.getEventGuests(eventId, { page: page - 1, size: 10 });
                    setGuests(response);
                    // Assuming response is an array
                    // You might need to adjust the logic if response contains other properties
                    setTotalPages(1); // Since we don't have totalPages in response, set it to a default value
                }
            } catch (error) {
                console.error('Error fetching guests: ', error);
            }
        };
        fetchGuests();
    }, [eventId, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            {event && (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Event Name: {event.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Guests
                    </Typography>
                    <ul>
                        {guests.map((guest: User, index: number) => (
                            <li key={index}>
                                {guest.firstName} {guest.lastName} - {guest.email}
                            </li>
                        ))}
                    </ul>
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
