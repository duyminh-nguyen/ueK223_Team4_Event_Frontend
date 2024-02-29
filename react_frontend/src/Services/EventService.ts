import api from "../config/Api";
import { Event } from "../types/models/Event.model";

const EventService = {
    getEvents: async () => {
        try {
            const response = await api.get("/event");
            return response.data;
        } catch (error) {
            console.error("Error", error);
            return [];
        }
    },

    getEventById: async (eventId: string): Promise<Event> => {
        try {
            const response = await api.get(`/event/${eventId}`);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    deleteEventById: async (eventId: string) => {
        try {
            await api.delete(`/event/${eventId}`);
            return true;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    createEvent: async (event: Event): Promise<Event> => {
        try {
            const response = await api.post("/event", event);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    updateEvent: async (event: Event): Promise<Event> => {
        try {
            const response = await api.put(`/event/${event.id}`, event);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    getEventGuestsEndpoint: (eventId: string) => {
        return `/event/${eventId}/guests`;
    },
};

export default EventService;
