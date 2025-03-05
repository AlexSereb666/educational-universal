import {ProfileCard, profileCardReducer} from "@/features/ProfileCard";
import {useParams} from "react-router-dom";
import {VStack} from "@/shared/ui/Stack";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const reducers: ReducersList = {
    profileCard: profileCardReducer,
}

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div data-testid="ProfilePage">
                <VStack>
                    <ProfileCard id={id} />
                </VStack>
            </div>
        </DynamicModuleLoader>
    )
};

export default ProfilePage;
