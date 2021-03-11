import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import { Button, Text } from "react-native";
import { SIGN_OUT_MUTATION } from "../gql/SignOutMutation";
import { CURRENT_USER_QUERY } from "./User";

export default function SignOutButton(): JSX.Element {
  const [
    signout,
    {
      //   loading,
      error,
    },
  ] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmit = useCallback(async () => {
    // console.log(inputs);
    try {
      await signout();
      // console.log(resOnSubmit);
    } catch {
      // console.error(error);
    }
  }, [signout]);

  return (
    <>
      <Button title="Sign out" onPress={onSubmit} />
      {error && (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          We had an issue signing you out, please try again :(
        </Text>
      )}
    </>
  );
}
