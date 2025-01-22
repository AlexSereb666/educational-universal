import {memo, ReactNode} from "react";

interface PageProps {
    children: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { children } = props;

    return (
        <div>
            {children}
        </div>
    )
});
