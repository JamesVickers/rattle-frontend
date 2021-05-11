// import { useMutation } from "@apollo/client";
// import React from "react";
// import { Button, View } from "react-native";
// import { SIGN_UP_MUTATION } from "../gql/SignUpMutation";
// import { useForm } from "../utils/useForm";
// import TextInput from "./TextInput";

// export default function RequestPasswordReset(): JSX.Element {
//   const {
//     inputs,
//     handleChange,
//     // clearForm,
//     // resetForm,
//     // clearIndividualKey
//   } = useForm({
//     email: "",
//   });

//   const [
//     signup,
//     {
//       data,
//       // loading,
//       error,
//     },
//   ] = useMutation(SIGN_UP_MUTATION, {
//     variables: inputs,
//   });

//   //   const onSubmit = useCallback(async () => {
//   //     // console.log(inputs);
//   //     try {
//   //       await signup();
//   //       // console.log(resOnSubmit);
//   //     } catch {
//   //       // console.error(error);
//   //     }
//   //     resetForm();
//   //   }, [resetForm, signup]);

//   return (
//     <View style={{ backgroundColor: "white" }}>
//       <Text>Request a password reset</Text>
//       <TextInput
//         value={inputs.email}
//         handleChange={handleChange}
//         name={"email"}
//         placeholder={"Email"}
//         clearValue={clearIndividualKey}
//       />
//       <Button title="Request password reset" onPress={() => null} />
//       {error && (
//         <Text>
//           Password reset request failed, please try again :(
//         </Text>
//       )}
//     </View>
//   );
// }

export {};
