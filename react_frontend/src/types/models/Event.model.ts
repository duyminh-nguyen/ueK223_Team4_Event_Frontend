import { User } from "./User.model";

export interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    guests: User[];
    owner: User; 
}

export type CreateEvent = Omit<Event, "id">;
