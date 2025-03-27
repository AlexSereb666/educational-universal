import type { Preview, Decorator } from '@storybook/react';
import { useEffect } from 'react';
import * as React from 'react';
import { Theme } from '../../src/shared/const/themes';
import '../../src/app/styles/index.scss';

const withTheme: Decorator = (Story, context) => {
    const { theme } = context.globals;

    useEffect(() => {
        const themeToSet = theme || Theme.light;
        document.documentElement.setAttribute('data-theme', themeToSet);
    }, [theme]);

    return <Story />;
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            defaultValue: Theme.light,
            toolbar: {
                icon: 'mirror',
                items: [
                    { value: Theme.light, title: 'Light' },
                    { value: Theme.dark, title: 'Dark' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [withTheme],
};

export default preview;
