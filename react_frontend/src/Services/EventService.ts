import api from "../config/Api";
import { Event } from "../types/models/Event.model";
import { User } from "../types/models/User.model";

// Service object for handling event-related API requests
const EventService = {
    // Fetch all events from the server
    getEvents: async () => {
        try {
            const response = await api.get("/event");
            return response.data;
        } catch (error) {
            console.error("Error", error);
            return [];
        }
    },

    // Fetch a specific event by its ID
    getEventById: async (eventId: string): Promise<Event> => {
        try {
            const response = await api.get(`/event/${eventId}`);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    // Delete an event by its ID
    deleteEventById: async (eventId: string) => {
        try {
            await api.delete(`/event/${eventId}`);
            return true;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    // Create a new event
    createEvent: async (event: Event): Promise<Event> => {
        try {
            const response = await api.post("/event", event);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    // Update an existing event
    updateEvent: async (event: Event): Promise<Event> => {
        try {
            const response = await api.put(`/event/${event.id}`, event);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    // Add a guest to an event
    addGuestToEvent: async (eventId: string, guest: User): Promise<Event> => {
        try {
            const response = await api.put(`/event/${eventId}/guests/`, guest);
            return response.data;
        } catch (error) {
            console.error("Error adding guest to event", error);
            throw error;
        }
    },

    // Get the endpoint for fetching event guests
    getEventGuestsEndpoint: (eventId: string) => {
        return `/event/${eventId}/guests`;
    },

    // Fetch guests of a specific event
    getEventGuests: async (eventId: string, pageable: any): Promise<User[]> => {
        try {
            const response = await api.get(`/event/${eventId}/guests`, {
                params: pageable 
            });
            return response.data.content;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },
};

export default EventService;
