import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import type { StateSchema, ThunkConfig } from './config/StateSchema';
import type { AppGetState } from './middleware/socketMiddleware';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    AppDispatch,
    ThunkConfig,
    AppGetState,
};
