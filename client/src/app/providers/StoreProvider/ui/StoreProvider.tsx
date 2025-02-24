import {ReactNode} from "react";
import {StateSchema} from "app/providers/StoreProvider";
import {ReducersMapObject} from "@reduxjs/toolkit";
import {createReduxStore} from "../config/store";
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

    //const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        //navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
