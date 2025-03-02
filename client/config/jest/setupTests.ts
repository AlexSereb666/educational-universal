// Такой файл вы могли наблюдать при create-react-app
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
) as jest.Mock;
