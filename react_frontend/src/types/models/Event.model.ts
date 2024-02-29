import { User } from "./User.model";

export type Event = {
    owner_id: string | undefined;
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    guests: User[]; // Array of User objects representing guests of the event
    owner: User; // User object representing the owner of the event
}