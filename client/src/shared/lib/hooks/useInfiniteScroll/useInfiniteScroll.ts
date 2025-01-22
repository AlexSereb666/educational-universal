import {MutableRefObject, useEffect, useRef} from "react";

export interface UseInfiniteScrollOptions {
    callback: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({callback, wrapperRef, triggerRef}: UseInfiniteScrollOptions) {
    useEffect(() => {
        const options = {
            root: wrapperRef.current,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(([entry]) => {
            console.log('Вижу!')
        }, options);

        observer.observe(triggerRef.current);

        return () => {
            if (observer) {
                observer.unobserve(triggerRef.current);
            }
        };

    }, [triggerRef, wrapperRef]);
}
