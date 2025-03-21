"use client"
import { useState } from 'react'
import { WaitListContext } from "@/lib/contexts/WaitlistContext"


// Context provider component
export const WaitListProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWaitListOpen, setIsWaitListOpen] = useState(false);
  const [email, setEmail] = useState<string>("");

  return (
    <WaitListContext.Provider value={{ isWaitListOpen, setIsWaitListOpen, email, setEmail }}>
      {children}
    </WaitListContext.Provider>
  );
};
