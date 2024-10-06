import {memo, useCallback, useEffect, useRef} from "react";
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
import * as cls from './ContactListForm.module.scss';
import {ItemListUsers} from "@/features/ContactList/ui/ItemListUsers/ItemListUsers";
import {getSearchOffset} from "@/features/ContactList/model/selectors/getSearchOffset/getSearchOffset";
import {getSearchLimit} from "@/features/ContactList/model/selectors/getSearchLimit/getSearchLimit";
import {Loader} from "@/shared/ui/Loader/Loader";

const initialReducers: ReducersList = {
    search: searchReducer,
}

export const ContactListForm = memo(() => {
    const dispatch = useAppDispatch();
    const search = useSelector(getSearchString);
    const listUsers = useSelector(getSearchListUsers);
    const isLoading = useSelector(getSearchIsLoading);
    const error = useSelector(getSearchError);
    const offset = useSelector(getSearchOffset);
    const limit = useSelector(getSearchLimit);

    const containerRef = useRef<HTMLDivElement>(null);

    const onChangeSearch = useCallback((value: string) => {
        dispatch(searchActions.setOffset(0))
        dispatch(searchActions.setSearch(value));
    }, [dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                dispatch(searchUsersByUsername({
                    search,
                    limit,
                    offset: 0,
                }));
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, dispatch]);

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
            if (isAtBottom && !isLoading) {
                dispatch(searchUsersByUsername({
                    search,
                    limit,
                    offset: offset + limit,
                }));
                dispatch(searchActions.setOffset(offset + limit));
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [offset, search, isLoading]);

    const listFoundUsers = () => {
        return (
            <div className={cls.container_list_users} ref={containerRef}>
                {listUsers && listUsers.map(({id, login}: any) => (
                    <ItemListUsers
                        key={`${id}-${login}`}
                        id={id}
                        login={login}
                    />
                ))}
                {!isLoading && listUsers && !listUsers.length && (
                    <div className={cls.not_found_users}>Пользователи не найдены</div>
                )}
                {isLoading && (<div className={cls.loading}><Loader/></div>)}
            </div>
        )
    }

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div>
                <div>
                    <InputContainer
                        value={search}
                        onChange={onChangeSearch}
                        label={'Поиск...'}
                        size={'small'}
                    />
                </div>
                {listFoundUsers()}
            </div>
        </DynamicModuleLoader>
    )
})
