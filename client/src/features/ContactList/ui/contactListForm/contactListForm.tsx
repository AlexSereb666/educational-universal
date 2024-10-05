import {memo, useCallback, useEffect} from "react";
import {InputContainer} from "@/shared/ui/InputContainer/InputContainer";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getSearchString} from "@/features/ContactList/model/selectors/getSearchString/getSearchString";
import {searchActions, searchReducer} from "@/features/ContactList/model/slice/searchSlice";
import {getSearchListUsers} from "@/features/ContactList/model/selectors/getSearchListUsers/getSearchListUsers";
import {getSearchIsLoading} from "@/features/ContactList/model/selectors/getSearchIsLoading/getSearchIsLoading";
import {getSearchError} from "@/features/ContactList/model/selectors/getSearchError/getSearchError";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {searchUsersByUsername} from "@/features/ContactList/model/services/searchUsersByUsername/searchUsersByUsername";

const initialReducers: ReducersList = {
    search: searchReducer,
}

export const ContactListForm = memo(() => {
    const dispatch = useAppDispatch();
    const search = useSelector(getSearchString);
    const listUsers = useSelector(getSearchListUsers);
    const isLoading = useSelector(getSearchIsLoading);
    const error = useSelector(getSearchError);

    const onChangeSearch = useCallback((value: string) => {
        dispatch(searchActions.setSearch(value));
    }, [dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                dispatch(searchUsersByUsername({
                    search,
                    limit: 20,
                    offset: 0,
                }));
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, dispatch]);

    useEffect(() => {
        console.log(listUsers)
    }, [listUsers]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div>
                <InputContainer
                    value={search}
                    onChange={onChangeSearch}
                    label={'Поиск...'}
                    size={'small'}
                />
            </div>
        </DynamicModuleLoader>
    )
})
