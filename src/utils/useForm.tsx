import { useEffect, useState } from "react";
import { SilentAny } from "../state/types";

export const useForm = (
  initial = {},
): {
  inputs: SilentAny;
  handleChange: (name: string, value: string) => void;
  resetForm: () => void;
  clearForm: () => void;
  clearIndividualKey: (key: string) => void;
} => {
  const [inputs, setInputs] = useState(initial);
  // used to check when initial values goes from nothing to something
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
    // cannot useEffect on initial, as that would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleChange = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    // turn object into array and empty values
    const blankStateArray = Object.entries(inputs).map(([key]) => [key, ""]);
    // turn array back into an object
    const blankStateObject = Object.fromEntries(blankStateArray);
    setInputs(blankStateObject);
  };

  const clearIndividualKey = (key: string) => {
    // turn object into array and empty individual value of matching key
    const arrayWithClearedKey = Object.entries(inputs).map((k) => {
      if (k[0] === key) {
        return [k[0], ""];
      } else {
        return k;
      }
    });
    // turn array back into an object
    const objectWithClearedKey = Object.fromEntries(arrayWithClearedKey);
    setInputs(objectWithClearedKey);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    clearIndividualKey,
  };
};
