import {User} from "@/entities/User";

export interface ProfileCardSchema {
    data: User,
    isLoading: boolean,
    error?: string;
}
