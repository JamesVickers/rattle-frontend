import React, { createContext, useState } from "react";

export type AppContextType = {
  // items: string[];
  // addItem: (name: string) => void;
  // themePref: "light" | "dark";
  // toggleThemePref: () => void;
  mode: string;
  toggleMode: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
  openExample: () => void;
  closeExample: () => void;
};

const contextDefaultValues: AppContextType = {
  // items: [],
  // addItem: () => {},
  // themePref: "light",
  // toggleThemePref: () => undefined,
  mode: "default",
  toggleMode: () => undefined,
  isOpen: false,
  toggleOpen: () => undefined,
  openExample: () => undefined,
  closeExample: () => undefined,
};

export const AppContext = createContext<AppContextType>(contextDefaultValues);

// custom hook to save repeating React.useContext(AppContext)
// just use this instear --> const { mode, toggleMode } = useAppContext()
// export const useAppContext = (): AppContextType => React.useContext(AppContext);

export default function AppProvider({
  children,
  mode,
  toggleMode,
}: {
  children: React.ReactNode;
  mode: string;
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
        mode,
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
