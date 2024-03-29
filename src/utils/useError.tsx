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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (newError: ApolloError | undefined) => {
    setError(newError);
  };

  const clearError = () => {
    setError(initial);
  };

  return {
    error,
    handleError,
    clearError,
  };
};
