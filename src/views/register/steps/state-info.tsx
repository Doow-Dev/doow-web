import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/buttons/custom-button";
import { OptionsInterface, SelectDropdown } from "../../../components/inputs/select-dropdown";
import Loading from "../../../components/loading/loading";
import { MemberCreateInput } from "../../../generated/graphql";
import {
  findtAllStates,
  findAllLgas,
  findAllWards,
} from "../../../utils/helpers";
import styles from "./steps.module.scss";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
  formState: MemberCreateInput;
  setFormData: (formData: MemberCreateInput) => void;
}

export const StateInfo: React.FC<Props> = (props) => {
  const { formState, nextStep, prevStep, setFormData } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [stateId, setStateId] = useState<string>("");
  const [lgaId, setLgaId] = useState<string>("");
  const [wardId, setWardId] = useState<string>("");
  const [states, setStates] = useState<OptionsInterface[]>([]);
  const [lgas, setLgas] = useState<OptionsInterface[]>([]);
  const [wards, setWards] = useState<OptionsInterface[]>([]);

  const getAllStates = async () => {
    setLoading(true);
    const val = await findtAllStates();
    if (val) {
      setLoading(false);
      setStates(val);
    }
  };

  const getAllLgas = async (state: string) => {
    setLoading(true);
    const val = await findAllLgas(state);
    if (val) {
      setLoading(false);
      setLgas(val);
    }
  };

  const getAllWards = async (lgaId: number) => {
    setLoading(true);
    const val = await findAllWards(lgaId);
    if (val) {
      setLoading(false);
      setWards(val);
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (stateId) {
      setLgas([]);
      const selectedState = states.find((state) => state.value === stateId);
      getAllLgas(selectedState.label);
    }
  }, [stateId, states]);

  useEffect(() => {
    if (lgaId) {
      setWards([]);
      getAllWards(Number(lgaId));
    }
  }, [lgaId]);

  const handleStateChange = (id: string) => {
    setLgas([]);
    setStateId(id);
  };

  const handleLgaChange = (id: string) => {
    setLgaId(id);
  };

  const handleWardChange = (id: string) => {
    setWardId(id);
  };

  const handleNext = () => {
    if (stateId && lgaId && wardId) {
      setFormData({
        ...formState,
        state_id: +stateId,
        lga_id: +lgaId,
        ward_id: +wardId,
      });

      nextStep();
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <div className={styles.inputs_form}>
        <SelectDropdown
          handleChange={(e) => handleStateChange(e)}
          label={"State"}
          options={states}
        />
        <SelectDropdown
          handleChange={(e) => handleLgaChange(e)}
          label={"LGA"}
          options={lgas}
        />
        <SelectDropdown
          handleChange={(e) => handleWardChange(e)}
          label={"Ward"}
          options={wards}
        />
      </div>
      <div className={styles.button_container}>
        <CustomButton title="Previous" onClickHandler={prevStep} />
        <CustomButton title="Next" onClickHandler={handleNext} />
      </div>
    </div>
  );
};

export default StateInfo;
