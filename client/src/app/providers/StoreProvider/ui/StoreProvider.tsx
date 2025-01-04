import {ReactNode} from "react";
import {StateSchema} from "@/app/providers/StoreProvider";
import {ReducersMapObject} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {createReduxStore} from "@/app/providers/StoreProvider/config/store";
import {Provider} from "react-redux";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    const navigate = useNavigate();

    const store = createReduxStore(
        // @ts-ignore
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
