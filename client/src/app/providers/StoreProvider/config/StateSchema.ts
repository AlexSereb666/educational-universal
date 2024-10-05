import {UserSchema} from "@/entities/User/model/types/user";
import {LoginSchema} from "@/features/Login/model/types/loginSchema";
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject
} from '@reduxjs/toolkit';
import {AxiosInstance} from "axios";
import {NavigateOptions} from "react-router-dom";
import {To} from "history";
import {RegistrationSchema} from "@/features/Registration/model/types/registrationSchema";
import {ContactListSearchSchema} from "@/features/contactList/model/types/contactListSearchSchema";

export interface StateSchema {
    user: UserSchema;
    login: LoginSchema;
    search: ContactListSearchSchema;
    registration: RegistrationSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
