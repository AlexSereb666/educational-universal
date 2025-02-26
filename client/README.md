## Запуск проекта

устанавливаем зависимости
```
npm install
```

Запуск frontend
```
npm run build:dev
```
```
npm run build:prod
```
```
npm run start:vite
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack (dev режим)
- `npm run start:vite` - Запуск frontend проекта на vite (dev режим)
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run unit` - Запуск unit тестов с jest
- `npm run storybook` - Запуск Storybook
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Конфигурация проекта

Для разработки проект содержит 2 конфига:
1. Webpack - ./config/build
2. Vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config
- /config/build/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----