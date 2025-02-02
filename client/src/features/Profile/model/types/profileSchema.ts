import {User} from "entities/User";

export interface ProfileSchema {
    data: User | null;
    isLoading: boolean;
    error?: string;
}
