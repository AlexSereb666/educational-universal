import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
    const {
        children,
        options = {},
    } = props;

    const {
        route = '/',
        initialState,
        asyncReducers,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                {children}
            </StoreProvider>
        </MemoryRouter>
    );
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(
        <TestProvider options={options}>
            {component}
        </TestProvider>
    );
}
