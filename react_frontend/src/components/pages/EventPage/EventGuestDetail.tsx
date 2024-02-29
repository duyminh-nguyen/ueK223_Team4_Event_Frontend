import api from "../../../config/Api";
import { Event } from '../../../types/models/Event.model';

const EventService = {
    // Existing methods...

    getEventById: async (eventId: string): Promise<Event> => {
        try {
            const response = await api.get(`/event/${eventId}`);
            const eventData: Event = response.data;

            // Ensure that eventData contains the guest data
            if (eventData.guests) {
                // If guest data is present, fetch the details for each guest
                const guestsWithDetails = await Promise.all(
                    eventData.guests.map(async (guestId: string) => {
                        const guestResponse = await api.get(`/user/${guestId}`);
                        return guestResponse.data;
                    })
                );

                // Replace the guest IDs with actual guest objects
                eventData.guests = guestsWithDetails;
            }

            return eventData;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },
};

export default EventService;
