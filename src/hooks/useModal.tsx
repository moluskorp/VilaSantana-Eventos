import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ModalProviderProps = {
    children: ReactNode;
};

interface ModalContextData {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
    const [open, setOpen] = useState(true);

    const value = useMemo(() => ({ open, setOpen }), [open]);

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}

export function useModal(): ModalContextData {
    const context = useContext(ModalContext);

    return context;
}
