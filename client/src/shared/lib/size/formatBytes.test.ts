import { formatBytes } from './formatBytes';

describe('formatBytes', () => {
    test('форматирует 0 байт как "0 Б"', () => {
        expect(formatBytes(0)).toBe('0 Б');
    });

    test('форматирует количество байт в Б', () => {
        expect(formatBytes(123)).toBe('123.00 Б');
    });

    test('форматирует количество байт в КБ', () => {
        expect(formatBytes(1024)).toBe('1.00 КБ');
        expect(formatBytes(2048)).toBe('2.00 КБ');
    });

    test('форматирует количество байт в МБ', () => {
        expect(formatBytes(1024 * 1024)).toBe('1.00 МБ');
        expect(formatBytes(5 * 1024 * 1024)).toBe('5.00 МБ');
    });

    test('форматирует количество байт в ГБ', () => {
        expect(formatBytes(1024 * 1024 * 1024)).toBe('1.00 ГБ');
        expect(formatBytes(5 * 1024 * 1024 * 1024)).toBe('5.00 ГБ');
    });

    test('форматирует количество байт в ТБ', () => {
        expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe('1.00 ТБ');
    });

    test('форматирует количество байт с заданной точностью (decimals)', () => {
        expect(formatBytes(123456789, 3)).toBe('117.738 МБ');
        expect(formatBytes(123456789, 4)).toBe('117.7376 МБ');
    });

    test('корректно форматирует большие значения в ПБ, ЭБ, ЗБ и далее', () => {
        expect(formatBytes(1024 ** 5)).toBe('1.00 ПБ');
        expect(formatBytes(1024 ** 6)).toBe('1.00 ЭБ');
        expect(formatBytes(1024 ** 7)).toBe('1.00 ЗБ');
    });

    test('работает с десятичными значениями, корректно округляя результат', () => {
        expect(formatBytes(1536)).toBe('1.50 КБ');
        expect(formatBytes(5000000)).toBe('4.77 МБ');
    });
});
