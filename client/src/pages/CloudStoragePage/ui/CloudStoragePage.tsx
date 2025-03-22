import React from 'react';
import { VStack } from '@/shared/ui/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { cloudStoragePreferencesReducer, cloudStorageReducer } from '@/entities/Storage';
import * as cls from './CloudStoragePage.module.scss';
import { CloudStorageExplorerHeader } from '@/widgets/CloudStorageExplorerHeader';
import { CloudStorageExplorerList } from '@/widgets/CloudStorageExplorerList';

const reducerList: ReducersList = {
    cloudStorage: cloudStorageReducer,
    cloudStoragePreferences: cloudStoragePreferencesReducer,
};

const CloudStoragePage = () => {
    return (
        <DynamicModuleLoader reducers={reducerList}>
            <VStack
                max
                gap={'32'}
            >
                <VStack
                    className={cls.CloudStorageExplorer}
                    gap={'32'}
                >
                    <CloudStorageExplorerHeader />
                    <CloudStorageExplorerList />
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default CloudStoragePage;
