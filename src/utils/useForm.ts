import { useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

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
    const blankStateArray = Object.entries(inputs).map(([key, value]) => [
      key,
      "",
    ]);
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
