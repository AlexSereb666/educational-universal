import {toZonedTime, format } from 'date-fns-tz';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const timeZone = 'UTC';
    const zonedDate = toZonedTime(date, timeZone);

    return format(zonedDate, 'dd.MM.yyyy HH:mm');
};
