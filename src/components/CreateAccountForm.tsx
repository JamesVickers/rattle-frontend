import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "styled-components/native";
import { SIGN_UP_MUTATION } from "../queries/SignUpMutation";
import { RootStackParams } from "../routes";
import { useError } from "../utils/useError";
import { useForm } from "../utils/useForm";
import { isValidEmail } from "../utils/validation";
import { Button } from "./Button";
import { ErrorBox } from "./ErrorBox";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

export const CreateAccountForm = ({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}): JSX.Element => {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "CreateAccount">
  >();
  const theme = useTheme();

  const { inputs, handleChange, clearIndividualKey } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { error, handleError, clearError } = useError();

  const [submitted, setSubmitted] = useState(false);

  // const submitDisabled =
  //   !inputs.firstName || !inputs.lastName || !inputs.email || !inputs.password;

  const [signup, { data, loading, error: signUpError }] = useMutation(
    SIGN_UP_MUTATION,
    {
      variables: inputs,
    },
  );

  useEffect(() => {
    // if graphql error changes, update useError hook
    handleError(signUpError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpError]);

  const onSubmit = useCallback(async () => {
    setSubmitted(true);
    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.password
    ) {
      try {
        await signup();
      } catch {
        handleError(signUpError);
      }
    }
  }, [
    inputs.firstName,
    inputs.lastName,
    inputs.email,
    inputs.password,
    signup,
    handleError,
    signUpError,
  ]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goBackToSignInScreen = useCallback(() => {
    navigation.navigate("SignIn");
  }, [navigation]);
  return (
    <FormStyled style={style}>
      <TextInput
        value={inputs.firstName}
        handleChange={handleChange}
        name={"firstName"}
        placeholder={"First Name"}
        isInvalid={submitted && !inputs.firstName}
        clearValue={clearIndividualKey}
      />
      <Spacer />
      <TextInput
        value={inputs.lastName}
        handleChange={handleChange}
        name={"lastName"}
        placeholder={"Last Name"}
        isInvalid={submitted && !inputs.lastName}
        clearValue={clearIndividualKey}
      />
      <Spacer />
      <TextInput
        value={inputs.email}
        handleChange={handleChange}
        name={"email"}
        placeholder={"Email"}
        isInvalid={
          (submitted && !inputs.email) ||
          (submitted && inputs.email !== "" && !isValidEmail(inputs.email))
        }
        isInvalidMessage="Please enter a valid email"
        clearValue={clearIndividualKey}
      />
      <Spacer />
      <TextInput
        secureTextEntry
        value={inputs.password}
        handleChange={handleChange}
        name={"password"}
        placeholder={"Password"}
        isInvalid={submitted && !inputs.password}
        clearValue={clearIndividualKey}
      />
      {data?.createUser && (
        <>
          <Spacer />
          <Text>Sign up successful with {data.createUser.email}</Text>
          <Text>You can now sign in to Rattle</Text>
          <Spacer />
          <Button
            text="Back to Sign In"
            onPress={goBackToSignInScreen}
            // disabled={submitDisabled}
          />
        </>
      )}
      {error && (
        <>
          <>
            <Spacer />
            <ErrorBox error={error} clearError={clearError} />
          </>
        </>
      )}
      {loading ? (
        <>
          <Spacer />
          <ActivityIndicator color={theme.colors.foreground} size="large" />
        </>
      ) : (
        <>
          <Spacer />
          <Button text="Sign up!" onPress={onSubmit} />
        </>
      )}
      <Spacer />
      <Button
        text="Cancel"
        touchableStyle={{
          backgroundColor: theme.colors.danger,
        }}
        onPress={onCancel}
      />
    </FormStyled>
  );
};
const FormStyled = styled(View)`
  width: 100%;
  align-items: center;
`;
