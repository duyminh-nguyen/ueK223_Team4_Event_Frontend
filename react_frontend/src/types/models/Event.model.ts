import { User } from "./User.model";

export type Event = {
    owner_id: string | undefined;
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    guests: User[];
    owner: User; 
}