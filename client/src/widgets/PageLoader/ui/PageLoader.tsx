import * as cls from './PageLoader.module.scss';
import {Loader} from "@/shared/ui/Loader";

export const PageLoader = () => (
    <div className={cls.PageLoader}>
        <Loader />
    </div>
);
