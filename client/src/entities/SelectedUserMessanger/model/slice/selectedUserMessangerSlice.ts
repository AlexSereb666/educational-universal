import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SelectedUserMessanger} from "@/entities/SelectedUserMessanger/model/types/selectedUserMessanger";

const initialState: SelectedUserMessanger = {
    id: null
};

export const selectedUserMessangerSlice = createSlice({
    name: 'selectedUserMessanger',
    initialState,
    reducers: {
        setSelectedIdUser: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        }
    }
});

export const { actions: selectedUserMessangerActions } = selectedUserMessangerSlice;
export const { reducer: selectedUserMessangerReducer } = selectedUserMessangerSlice;
