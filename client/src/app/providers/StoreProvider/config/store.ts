import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { scrollSaveSliceReducer } from '@/features/ScrollSave';
import { rtkApi } from '@/shared/api/rtkApi';
import { toastReducer } from '@/entities/Toast';
import { createSocketMiddleware } from '../middleware/socketMiddleware';
import { chatSocketModule } from '@/entities/ChatMessanger';
import { SocketModuleConfig } from '@/shared/types/socket';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scrollSave: scrollSaveSliceReducer,
        toast: toastReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const listSocketMiddleware: SocketModuleConfig[] = [chatSocketModule];

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            })
                .concat(rtkApi.middleware)
                .prepend(createSocketMiddleware(listSocketMiddleware)),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
