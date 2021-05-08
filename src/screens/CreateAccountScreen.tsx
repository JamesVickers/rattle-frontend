import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Outer } from "../components/Outer";
import CreateAccountForm from "../components/CreateAccountForm";
import Spacer from "../components/Spacer";
import Text from "../components/Text";

export default function CreateAccountScreen(): JSX.Element {
  return (
    <SafeAreaViewDefault>
      <Outer style={{ alignItems: "center" }}>
        <Text>Create an account</Text>
        <CreateAccountForm />
        <Spacer />
      </Outer>
    </SafeAreaViewDefault>
  );
}
