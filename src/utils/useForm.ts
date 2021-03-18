import { useEffect, useState } from "react";

export default function useForm(
  initial = {},
): {
  inputs: unknown; // TODO: change inpute type
  handleChange: (name: string, value: string) => void;
  resetForm: () => void;
  clearForm: () => void;
} {
  const [inputs, setInputs] = useState(initial);
  // used to check when initial values goes from nothing to something
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
    // cannot useEffect on initial, as that would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function handleChange(name: string, value: string) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // turn object into array and empty values
    const blankStateArray = Object.entries(inputs).map(([key]) => [key, ""]);
    // turn array back into an object
    const blankStateObject = Object.fromEntries(blankStateArray);
    setInputs(blankStateObject);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
