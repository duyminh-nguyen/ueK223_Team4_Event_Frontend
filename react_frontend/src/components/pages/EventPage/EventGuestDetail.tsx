import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import EventService from '../../../Services/EventService';
import { Event } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';

const EventGuestDetail = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEventAndGuests = async () => {
            try {
                const eventData = await EventService.getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event: ', error);
            }
        };
        fetchEventAndGuests();
    }, [eventId]);

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
                        {event.guests &&
                            event.guests.map((guest: User, index: number) => (
                                <li key={index}>
                                    {guest.firstName} {guest.lastName} - {guest.email}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventGuestDetail;
