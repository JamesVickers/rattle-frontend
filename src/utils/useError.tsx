import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";

export const useError = (
  initial = undefined,
): {
  error: ApolloError | undefined;
  handleError: (newError: ApolloError | undefined) => void;
  clearError: () => void;
} => {
  const [error, setError] = useState<ApolloError | undefined>(initial);

  useEffect(() => {
    setError(initial);
  }, [initial]);

  function handleError(newError: ApolloError | undefined) {
    setError(newError);
  }

  function clearError() {
    setError(initial);
  }

  return {
    error,
    handleError,
    clearError,
  };
};
