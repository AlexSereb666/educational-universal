import defaultAvatar from '@/shared/assets/defaultAvatar.png';

export function getUserAvatar(avatar: string | null): string {
    if (avatar) {
        return `${__API__}/uploads/${avatar}`;
    }

    return defaultAvatar;
}
