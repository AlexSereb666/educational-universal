import {getUserAuthData, User} from "entities/User";
import {useSelector} from "react-redux";

export const useAuthUser = (): User | undefined => {
    return useSelector(getUserAuthData);
};
