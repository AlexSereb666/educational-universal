import {User} from "@/entities/User";

export interface Comment {
    id: number;
    user: User;
    text: string;
    date: string;
}
