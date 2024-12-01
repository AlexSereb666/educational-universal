import {CSSProperties, memo} from "react";
import * as cls from './Skeleton.module.scss';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
   const {
       width,
       height,
       border
   } = props;

   const styles: CSSProperties = {
       width,
       height,
       borderRadius: border,
   }

    return (
       <div
           className={cls.skeleton}
           style={styles}
       />
   )
});
