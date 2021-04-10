import React, { createContext, useState } from "react";

export type AppContextType = {
  // items: string[];
  // addItem: (name: string) => void;
  toggleMode: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
  openExample: () => void;
  closeExample: () => void;
};

const contextDefaultValues: AppContextType = {
  // items: [],
  // addItem: () => {},
  toggleMode: () => undefined,
  isOpen: false,
  toggleOpen: () => undefined,
  openExample: () => undefined,
  closeExample: () => undefined,
};

export const AppContext = createContext<AppContextType>(contextDefaultValues);

// custom hook to save repeating React.useContext(AppContext)
// just use this instead --> const { mode, toggleMode } = useAppContext()
// export const useAppContext = (): AppContextType => React.useContext(AppContext);

export default function AppProvider({
  children,
  toggleMode,
}: {
  children?: React.ReactNode;
  toggleMode: () => void;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(contextDefaultValues.isOpen);

  // const addItem = (newItem: string) => setItems((items) => [...items, newItem]);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const openExample = () => setIsOpen(true);
  const closeExample = () => setIsOpen(false);

  return (
    <AppContext.Provider
      value={{
        toggleMode,
        isOpen,
        toggleOpen,
        openExample,
        closeExample,
      }}>
      {children}
    </AppContext.Provider>
  );
}
