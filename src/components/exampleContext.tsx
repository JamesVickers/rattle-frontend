import React, { createContext, useState } from "react";

export type ExampleContextState = {
  // items: string[];
  // addItem: (name: string) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  openExample: () => void;
  closeExample: () => void;
};

const contextDefaultValues: ExampleContextState = {
  // items: [],
  // addItem: () => {},
  isOpen: false,
  toggleOpen: () => undefined,
  openExample: () => undefined,
  closeExample: () => undefined,
};

export const ExampleContext = createContext<ExampleContextState>(
  contextDefaultValues,
);

export default function ExampleProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // const ExampleProvider: FC = ({ children }) => {
  // const [items, setItems] = useState<string[]>(contextDefaultValues.items);
  const [isOpen, setIsOpen] = useState<boolean>(contextDefaultValues.isOpen);

  // const addItem = (newItem: string) => setItems((items) => [...items, newItem]);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const openExample = () => setIsOpen(true);
  const closeExample = () => setIsOpen(false);

  return (
    <ExampleContext.Provider
      value={{
        // items,
        // addItem,
        isOpen,
        toggleOpen,
        openExample,
        closeExample,
      }}>
      {children}
    </ExampleContext.Provider>
  );
}

// // Custome hook for accessing 'Example' local state
// // saves importing useContext and ExampleContext everytime we want to access the 'Example' local state
// function useExample(
//   all,
// ): {
//   all: ExampleContextState;
// } {
//   const all = useContext(ExampleContext);
//   return all;
// }

// export { ExampleProvider, useExample };
