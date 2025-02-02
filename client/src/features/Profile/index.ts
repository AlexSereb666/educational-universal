export {
    ModalProfile
} from './ui/ModalProfile/ModalProfile';

export {
    fetchUserById
} from 'features/Profile/model/service/fetchUserById/fetchUserById';

export type {
    ProfileSchema
} from './model/types/profileSchema';

export {
    getProfileData,
    getProfileError,
    getProfileIsLoading
} from './model/selectors/profile';
