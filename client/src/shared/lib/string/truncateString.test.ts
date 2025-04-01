import { truncateString } from './truncateString';

describe('truncateString', () => {
    test('возвращает строку без изменений, если её длина меньше или равна maxLength', () => {
        expect(truncateString('Hello', 10)).toBe('Hello');
        expect(truncateString('Short', 5)).toBe('Short');
    });

    test('обрезает строку до maxLength, если maxLength <= 8', () => {
        expect(truncateString('Hello, world!', 8)).toBe('Hello, w');
        expect(truncateString('123456789', 5)).toBe('12345');
    });

    test('обрезает строку и добавляет "..." в середине, если maxLength > 8', () => {
        expect(truncateString('Hello, world!', 10)).toBe('He...orld!');
        expect(truncateString('Super long string for testing', 15)).toBe(
            'Super l...sting',
        );
    });

    test('возвращает пустую строку, если входная строка пустая', () => {
        expect(truncateString('', 10)).toBe('');
    });

    test('корректно работает с maxLength равным 0', () => {
        expect(truncateString('Hello', 0)).toBe('');
    });

    test('корректно работает с maxLength равным 1', () => {
        expect(truncateString('Hello', 1)).toBe('H');
    });

    test('корректно работает с maxLength равным 8', () => {
        expect(truncateString('Hello, world!', 8)).toBe('Hello, w');
    });
});
