import {ContactListSearchSchema} from "@/features/contactList/model/types/contactListSearchSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {searchUsersByUsername} from "@/features/contactList/model/services/searchUsersByUsername/searchUsersByUsername";

const initialState: ContactListSearchSchema = {
    isLoading: false,
    search: '',
    limit: 20,
    offset: 0,
    listUsers: [],
};

export const searchSlice = createSlice({
    name: 'searchUsers',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsersByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(searchUsersByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listUsers = action.payload.rows;
            })
            .addCase(searchUsersByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
