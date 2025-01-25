import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ScrollSaveSchema} from "@/features/ScrollSave";

const initialState: ScrollSaveSchema = {
    scroll: {}
}

export const scrollSaveSlice = createSlice({
    name: 'ScrollSaveSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position;
        }
    }
});

export const { actions: scrollSaveSliceActions } = scrollSaveSlice;
export const { reducer: scrollSaveSliceReducer } = scrollSaveSlice;
