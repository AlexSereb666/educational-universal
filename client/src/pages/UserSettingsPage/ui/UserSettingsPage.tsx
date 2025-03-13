import { useParams } from 'react-router-dom';
import { Split } from '@/shared/ui/Stack';
import { SettingsTabs } from '@/widgets/SettingsTabs';
import {
    ReducersList,
    DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { settingsReducer } from '@/entities/Settings';
import { SettingsPanel } from '@/widgets/SettingsPanel';

const reducers: ReducersList = {
    settings: settingsReducer,
};

const UserSettingsPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div data-testid="UserSettingsPage">
                <Split
                    ratio={'4:1'}
                    gap={'16'}
                >
                    <SettingsPanel />
                    <SettingsTabs />
                </Split>
            </div>
        </DynamicModuleLoader>
    );
};

export default UserSettingsPage;
