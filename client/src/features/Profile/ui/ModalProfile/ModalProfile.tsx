import {memo, useEffect} from "react";
import * as cls from './ModalProfile.module.scss';
import avatarDefault from '@/shared/assets/defaultAvatar.png';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {profileReducer} from "@/features/Profile/model/slice/ProfileSlice";
import {useSelector} from "react-redux";
import {getProfileData, getProfileError, getProfileIsLoading} from "@/features/Profile";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchUserById} from "@/features/Profile";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

const reducerList: ReducersList = {
    profile: profileReducer,
}

interface ModalProfileProps {
    id: number;
}

export const ModalProfile = memo((props: ModalProfileProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();

    const user = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch]);

    let content = null;

    if (isLoading) {
        content = (
            <div className={cls.isLoading}>
                <Skeleton width={'80%'} height={'30px'}/>
                <Skeleton width={'100px'} height={'100px'} border={'50%'}/>
                <Skeleton width={'100%'} height={'20px'}/>
                <Skeleton width={'100%'} height={'20px'}/>
                <Skeleton width={'100%'} height={'20px'}/>
            </div>
        )
    } else if (user) {
        content = (
            <>
                <div className={cls.title}>
                    Профиль пользователя
                </div>
                <div className={cls.body_profile}>
                    <img src={avatarDefault} alt={'Аватар'} className={cls.avatar}/>
                    <div>
                    <span>
                        Имя пользователя:
                    </span>
                        <span className={cls.data_user}>
                        {user.login}
                    </span>
                    </div>
                    <div>
                    <span>
                        Email пользователя:
                    </span>
                        <span className={cls.data_user}>
                        {user.email}
                    </span>
                    </div>
                    <div>
                    <span className={cls.data_user_active}>
                        {user.isActivated ? 'Профиль активный' : 'Профиль неактивный'}
                    </span>
                    </div>
                </div>
            </>
        );
    } else if (error) {
        content = (
            <div>Ошибка...</div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducerList} removeAfterUnmount>
            <div className={cls.container}>
                {content}
            </div>
        </DynamicModuleLoader>
    )
});
