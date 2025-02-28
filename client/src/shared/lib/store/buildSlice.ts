import {bindActionCreators, CreateSliceOptions, SliceCaseReducers} from "@reduxjs/toolkit/dist";
import {createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = () => {
        const dispatch = useDispatch();

        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch])
    }

    return {
        ...slice,
    };
}
