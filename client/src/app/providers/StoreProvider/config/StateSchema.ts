import {UserSchema} from "@/entities/User";
import {LoginSchema} from "@/features/Login";
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject
} from '@reduxjs/toolkit';
import {AxiosInstance} from "axios";
import {RegistrationSchema} from "@/features/Registration";
import {ContactListSearchSchema} from "@/features/ContactList";
import {ChatMessanger} from "@/entities/ChatMessanger";
import {ArticleDetailsSchema, TypesArticleSchema} from "@/entities/Articles";
import {ProfileSchema} from "@/features/Profile";
import {AddCommentFormSchema} from "@/features/AddCommentForm";
import {ArticlesPageSchema} from "@/pages/ArticlesPage";
import {ScrollSaveSchema} from "@/features/ScrollSave";
import {ArticleDetailsPageSchema} from "@/pages/ArticlesDetailsPage";
import {rtkApi} from "@/shared/api/rtkApi";

export interface StateSchema {
    user: UserSchema;
    login: LoginSchema;
    registration: RegistrationSchema
    scrollSave: ScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    search?: ContactListSearchSchema;
    chatMessanger?: ChatMessanger;
    articleDetails?: ArticleDetailsSchema;
    typesArticle?: TypesArticleSchema;
    profile?: ProfileSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
