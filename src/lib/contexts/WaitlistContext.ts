import { createContext, Dispatch, SetStateAction, useContext } from "react";

// Define the context value type
interface WaitListContextType {
  isWaitListOpen: boolean;
  setIsWaitListOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}
// Create a context for the waitlist state
export const WaitListContext = createContext<WaitListContextType>({
    isWaitListOpen: false,
    setIsWaitListOpen: () => {},
    email: '',
    setEmail: () => {}
});

// Custom hook to use the highlight context
export const useWaitListContext = () => {
  const context = useContext(WaitListContext)
  return {...context}
};
