import {formatDate} from "@/shared/lib/date/formatDate";

describe('formatDate', () => {
    test('должен корректно форматировать дату с полной информацией (UTC)', () => {
        const input = '2024-01-02T15:30:00Z';
        const expected = '02.01.2024 15:30';
        expect(formatDate(input)).toBe(expected);
    });

    test('должен корректно форматировать дату без времени (должен установить 00:00 по умолчанию)', () => {
        const input = '2024-01-02';
        const expected = '02.01.2024 00:00';
        expect(formatDate(input)).toBe(expected);
    });

    test('должен корректно обрабатывать неверные даты', () => {
        const input = 'invalid-date';
        expect(() => formatDate(input)).toThrow(Error);
    });

    test('должен корректно обрабатывать пустую строку', () => {
        const input = '';
        expect(() => formatDate(input)).toThrow(Error);
    });

    test('должен учитывать разные часовые пояса (входное время с таймзоной +03:00)', () => {
        const input = '2024-01-02T15:30:00+03:00';
        const expected = '02.01.2024 12:30';
        expect(formatDate(input)).toBe(expected);
    });

    test('должен корректно обрабатывать дату в формате ISO 8601', () => {
        const input = '2024-01-02T15:30:00.000Z';
        const expected = '02.01.2024 15:30';
        expect(formatDate(input)).toBe(expected);
    });
});
