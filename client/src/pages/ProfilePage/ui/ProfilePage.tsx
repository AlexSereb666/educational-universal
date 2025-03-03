import classnames from 'classnames';
import * as cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    classname?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const {
        classname,
    } = props;

    return (
        <div className={classnames(cls.ProfilePage, {}, [classname])}>
            ProfilePage
        </div>
    )
};

export default ProfilePage;
