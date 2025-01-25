export type {
    ScrollSaveSchema,
} from './model/types/ScrollSaveSchema';

export {
    getScrollSave,
    getScrollSavePath
} from './model/selectors/ScrollSave';

export {
    scrollSaveSliceActions,
    scrollSaveSliceReducer
} from './model/slices/ScrollSaveSlice';
