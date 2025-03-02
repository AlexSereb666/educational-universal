import {StateSchema} from "@/app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";

export const getScrollSave = (state: StateSchema) => state?.scrollSave?.scroll;
export const getScrollSavePath = createSelector(
    getScrollSave,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
