import React, { createContext, useState } from "react";

interface AgentFormData {
  state: string;
  lga: string;
  ward: string;
  pu: string;
  agentId: string;
  password: string;
  otp: string;
}
interface AccountCreationInterface {
  acountTypeIndex: number;
  step: number;
  setAccountTypeIndex: (index: number) => void;
  setStep: (index: number) => void;
  agentFormData: AgentFormData;
  setAgentFormData: (data: AgentFormData) => void;
}

interface ProviderInterface {
  children: React.ReactNode;
}

const initialValue: AccountCreationInterface = {
  acountTypeIndex: 0,
  step: 0,
  setAccountTypeIndex: (index) => {},
  setAgentFormData: (data) => {},
  setStep: (index) => {},
  agentFormData: {
    state: "",
    lga: "",
    ward: "",
    pu: "",
    agentId: "",
    password: "",
    otp: "",
  },
};

export const AccountCreationContext =
  createContext<AccountCreationInterface>(initialValue);

export const AccountCreationProvider: React.FC<ProviderInterface> = ({
  children,
}) => {
  const [chosenTypeIndex, setChosenTypeIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [agentFormData, setAgentFormData] = useState<AgentFormData>({
    state: "",
    lga: "",
    ward: "",
    pu: "",
    agentId: "",
    password: "",
    otp: "",
  });

  const setAccountTypeIndex = (index: number) => {
    setChosenTypeIndex(index);
  };

  const setStep = (index: number) => {
    setCurrentStep(index);
  };

  const value: AccountCreationInterface = {
    acountTypeIndex: chosenTypeIndex,
    step: currentStep,
    setAccountTypeIndex,
    setStep,
    agentFormData,
    setAgentFormData,
  };

  return (
    <AccountCreationContext.Provider value={value}>
      {children}
    </AccountCreationContext.Provider>
  );
};

export default AccountCreationContext;
