import { memo, useCallback, useEffect, useState } from 'react';
import * as cls from './ProfileCard.module.scss';
import classNames from 'classnames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findUserById } from '../../model/services/findUserById/findUserById';
import {
    getProfileCardDataUser,
    getProfileCardError,
    getProfileCardIsLoading,
} from '../../model/selectors/profileCard';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useAuthUser } from '@/shared/lib/hooks/useAuthUser/useAuthUser';
import { HStack, VStack } from '@/shared/ui/Stack';
import defaultAvatar from '@/shared/assets/defaultAvatar.png';
import { Input } from '@/shared/ui/Input';
import { profileCardActions } from '../../model/slice/ProfileCardSlice';
import { Button } from '@/shared/ui/Button';
import { editDataUser } from '../../model/services/editDataUser/editDataUser';
import { Text } from '@/shared/ui/Text';
import editIcon from '@/shared/assets/icons/Edit.svg';
import { Icon } from '@/shared/ui/Icon';
import { FileInput } from '@/shared/ui/FileInput/FileInput';
import { updateAvatar, User } from '@/entities/User';

interface ProfileCardProps {
    className?: string;
    id: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch();

    const user = useAuthUser();
    const isLoading = useSelector(getProfileCardIsLoading);
    const dataProfile = useSelector(getProfileCardDataUser);
    const error = useSelector(getProfileCardError);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(findUserById(id));
    }, [dispatch]);

    const onChangeLogin = useCallback(
        (value: string) => {
            dispatch(profileCardActions.setLogin(value));
        },
        [dispatch],
    );

    const changeEditMode = useCallback(
        (state: boolean) => {
            if (!state) {
                dispatch(findUserById(id));
            }
            setEditMode(state);
        },
        [dispatch],
    );

    const saveProfile = useCallback(() => {
        dispatch(
            editDataUser({
                id: Number(id),
                login: dataProfile.login,
            }),
        );
        setEditMode(false);
    }, [dispatch, dataProfile, id]);

    const handleFileUpload = (files: File[]) => {
        dispatch(
            updateAvatar({
                avatar: files[0],
            }),
        );
    };

    const getAvatar = (item: User) => {
        return item?.avatar ? `${__API__}/uploads/${item?.avatar}` : defaultAvatar;
    };

    const permissionEdit = user.id === dataProfile?.id;

    if (isLoading) {
        return (
            <VStack
                max
                gap={'32'}
                align={'center'}
                className={classNames(cls.ProfileCard, {}, [className])}
            >
                <Skeleton
                    width={200}
                    height={200}
                    border={'50%'}
                />
                <VStack
                    max
                    gap={'16'}
                    align={'start'}
                >
                    <Skeleton
                        width={'100%'}
                        height={50}
                        border={'10'}
                    />
                    <Skeleton
                        width={'100%'}
                        height={50}
                        border={'10'}
                    />
                    <Skeleton
                        width={'80%'}
                        height={50}
                        border={'10'}
                    />
                </VStack>
            </VStack>
        );
    }

    return (
        <VStack
            max
            gap={'32'}
            align={'center'}
            className={classNames(cls.ProfileCard, {}, [className])}
        >
            <div className={cls.avatarBlock}>
                <img
                    src={permissionEdit ? getAvatar(user) : getAvatar(dataProfile)}
                    alt={'avatar'}
                    className={cls.avatar}
                />
                {permissionEdit && (
                    <FileInput
                        onFileSelect={handleFileUpload}
                        multiple={false}
                        acceptType={'images'}
                    >
                        <Icon
                            Svg={editIcon}
                            className={cls.editBtn}
                        />
                    </FileInput>
                )}
            </div>
            <VStack
                max
                gap={'16'}
                align={'start'}
            >
                <Input
                    value={dataProfile?.login ?? ''}
                    label={'Логин'}
                    onChange={onChangeLogin}
                    isActive={editMode}
                />
                <Input
                    value={dataProfile?.email ?? ''}
                    label={'Email'}
                    isActive={false}
                />
                {permissionEdit && (
                    <VStack
                        max
                        align={'end'}
                    >
                        {!editMode ? (
                            <Button onClick={() => changeEditMode(true)}>
                                Редактировать
                            </Button>
                        ) : (
                            <HStack gap={'32'}>
                                <Button onClick={() => changeEditMode(false)}>
                                    Отмена
                                </Button>
                                <Button onClick={saveProfile}>Сохранить</Button>
                            </HStack>
                        )}
                    </VStack>
                )}
                {error && <Text size={'small'}>{error}</Text>}
            </VStack>
        </VStack>
    );
});
