import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import { CreateAccountForm } from "../components/CreateAccountForm";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";

export const CreateAccountScreen = (): JSX.Element => {
  return (
    <SafeAreaViewDefault>
      <Outer style={{ alignItems: "center" }}>
        <Text>Create an account</Text>
        <Spacer />
        <CreateAccountForm />
        <Spacer />
      </Outer>
    </SafeAreaViewDefault>
  );
};
