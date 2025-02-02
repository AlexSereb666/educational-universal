import {User} from "entities/User";

export interface ContactListSearchSchema {
    search: string;
    listUsers: User[];
    limit: number;
    offset: number;
    isLoading: boolean;
    error?: string;
}
