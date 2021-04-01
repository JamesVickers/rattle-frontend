import React, { createContext, useState } from "react";

export type AppContextType = {
  // items: string[];
  // addItem: (name: string) => void;
  // themePref: "light" | "dark";
  // toggleThemePref: () => void;
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
  isOpen: false,
  toggleOpen: () => undefined,
  openExample: () => undefined,
  closeExample: () => undefined,
};

export const AppContext = createContext<AppContextType>(contextDefaultValues);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // const AppProvider: FC = ({ children }) => {
  // const [items, setItems] = useState<string[]>(contextDefaultValues.items);
  // const [themePref, setThemePref] = useState(contextDefaultValues.themePref);
  const [isOpen, setIsOpen] = useState<boolean>(contextDefaultValues.isOpen);

  // const addItem = (newItem: string) => setItems((items) => [...items, newItem]);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const openExample = () => setIsOpen(true);
  const closeExample = () => setIsOpen(false);

  return (
    <AppContext.Provider
      value={{
        // items,
        // addItem,
        // themePref,
        // toggleThemePref,
        isOpen,
        toggleOpen,
        openExample,
        closeExample,
      }}>
      {children}
    </AppContext.Provider>
  );
}

// // Custome hook for accessing 'Example' local state
// // saves importing useContext and AppContext everytime we want to access the 'Example' local state
// function useExample(
//   all,
// ): {
//   all: AppContextType;
// } {
//   const all = useContext(AppContext);
//   return all;
// }

// export { AppProvider, useExample };
