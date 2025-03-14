"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { createContext, RefObject, useContext, useRef, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

// Define the context value type
interface WaitListContextType {
  highlightForm: () => void;
  inputRefs: RefObject<HTMLInputElement[] | null>;
}
// Create a context for the waitlist state
const WaitListContext = createContext<WaitListContextType | null>(null);

// Context provider component
export const WaitListProvider = ({ children }: { children: React.ReactNode }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const highlightForm = () => {
    if (inputRefs.current && inputRefs.current.length > 0) {
      // Bring the form into view
      // inputRef.current.scrollIntoView({ block: 'start' });
      inputRefs.current[0]?.focus();
      // Remove highlight after 2 seconds
    }
  };

  return (
    <WaitListContext.Provider value={{ highlightForm, inputRefs }}>
      {children}
    </WaitListContext.Provider>
  );
};

// Custom hook to use the highlight context
export const useWaitListRefs = () => {
  const context = useContext(WaitListContext)
  return {...context}
};