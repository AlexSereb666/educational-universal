export interface Notification {
    id: number;
    title: string;
    description: string;
    href?: string;
    isRead: boolean;
    createdAt: Date;
}
