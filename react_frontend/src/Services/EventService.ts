import { error } from "console";
import api from "../config/Api";
import { CreateEvent, Event } from "../types/models/Event.model";

const EventService = {
    getEvent: async () => {
        try {
            const response = await api.get("/event");

            return response.data;
        } catch (error) {
            console.error("Error", error);

            return [];
        }
    },

    getById: async (eventID: string): Promise<Event> => {
        const { data } = await api.get<Event>(`/${eventID}`);

        return data;
    },

    deleteEventById: async (id: string | number) => {
        return api.delete(`/event/${id}`);
    },

    createEvent: async (params: CreateEvent) => {
        const res = await api.post("/event", params);

        if (res && res.status === 200) {

            console.log("image successfully created");

        }
    },

    updateEvent: async (params: Event) => {
        return api.put(`/event/${params.id}`, params);
    },

    getEventParticipantsEndpoint: (eventId: string) => {
        return `/event${eventId}/participants`;
    },
};

export default EventService;