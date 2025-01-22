import React, { useCallback } from "react";

interface useScrollToEndProps {
    callback: () => void;
}

export const useScrollToEnd = (props: useScrollToEndProps) => {
    const { callback } = props;

    if (!callback) {
        return undefined;
    }

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const bottom = e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;
            if (bottom) {
                callback();
            }
        },
        [callback]
    );

    return handleScroll;
};
