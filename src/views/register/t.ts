import { OptionsInterface } from "../../components/inputs";
import { Marital_Status } from "../../generated/graphql";

export interface StepInterface {
  title: string;
  component: JSX.Element;
}

export const MaritalOptions: OptionsInterface[] = [
  {
    value: Marital_Status.Single,
    label: "Single",
  },
  {
    value: Marital_Status.Married,
    label: "Married",
  },
];

export const GenderOptions: OptionsInterface[] = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
