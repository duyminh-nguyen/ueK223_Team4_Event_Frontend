import { User } from "./User.model";

export type Event = {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    guests: User[];
    owner: User; 
}