import { Split } from '@/shared/ui/Stack';
import { SettingsTabs } from '@/widgets/SettingsTabs';
import {
    ReducersList,
    DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SettingsPanel } from '@/widgets/SettingsPanel';
import { settingsReducer } from '@/entities/Settings';

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
