import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import TextInput from "../components/TextInput";
import { POST_ITEM_QUERY } from "../gql/PostItemQuery";
import { UPDATE_POST_MUTATION } from "../gql/UpdatePostMutation";
import { RootStackParams } from "../routes";
import useForm from "../utils/useForm";

export default function UpdatePostcreen(): JSX.Element {
  const route = useRoute<RouteProp<RootStackParams, "UpdatePost">>();
  const { id } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const {
    data,
    loading,
    // error
  } = useQuery(POST_ITEM_QUERY, {
    variables: { id },
  });

  const [
    updatePost,
    {
      // data:updateDate,
      error: updateError,
      // loading: updateLoading
    },
  ] = useMutation(UPDATE_POST_MUTATION);

  const {
    inputs,
    handleChange,
    // clearForm, resetForm
  } = useForm({
    title: data?.Post.title,
    body: data?.Post.body,
    // author: "JamesVickers",
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: "lightBlue" }}>
      <Text>UpdatePostItemScreen</Text>
      <Button title="goBack" onPress={() => navigation.goBack()} />
      <Text>Post id to pudate is: {id}</Text>
      <TextInput
        value={inputs.title}
        handleChange={handleChange}
        name={"title"}
        placeholder={"Add the post title"}
      />
      <TextInput
        value={inputs.body}
        handleChange={handleChange}
        name={"body"}
        placeholder={"Add the post body text"}
      />
      <Button
        title="Update"
        onPress={async () => {
          try {
            // const res =
            const res = await updatePost({
              variables: {
                id: id,
                title: inputs.title,
                body: inputs.body,
              },
            });
            console.log("updatePost res: ", res);
          } catch {
            console.error("updatePost error: ", updateError);
          }
        }}
      />
    </SafeAreaView>
  );
}
