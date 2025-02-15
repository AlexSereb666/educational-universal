import {createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState} from "react";
import {SpringRef} from "@react-spring/web";

type SpringType = typeof import('@react-spring/web');

interface AnimationContextPayload {
    Spring?: SpringType;
    isLoading?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'),
    ]);
}

export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
}

export const AnimationProvider = ({children}: {children: ReactNode}) => {
    const SpringRef = useRef<SpringType>();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring]) => {
            SpringRef.current = Spring;
            setIsLoading(true);
        })
    }, []);

    const value = useMemo(() => ({
        Spring: SpringRef.current,
        isLoading
    }), [isLoading]);

    return (
        <AnimationContext.Provider
            value={value}
        >
            {children}
        </AnimationContext.Provider>
    )
}
