import { CloudStorage } from './CloudStorage';

export interface CloudStorageSchema {
    isLoading: boolean;
    error?: string;
    data?: CloudStorage;
}
