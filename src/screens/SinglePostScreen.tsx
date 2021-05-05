import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Card } from "../components/Card";
import HardDeletePostItem from "../components/HardDeletePostItem";
import TextInput from "../components/TextInput";
import Text from "../components/Text";
import { POST_ITEM_QUERY } from "../queries/PostItemQuery";
import { UPDATE_POST_MUTATION } from "../queries/UpdatePostMutation";
import { ChatStackParams } from "../routes";
import { useForm } from "../utils/useForm";

export default function SinglePostcreen(): JSX.Element {
  const route = useRoute<RouteProp<ChatStackParams, "SinglePost">>();
  const { id } = route.params;
  const navigation = useNavigation<
    StackNavigationProp<ChatStackParams, "SinglePost">
  >();

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

  const { inputs, handleChange } = useForm({
    title: data?.Post.title,
    body: data?.Post.body,
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaViewDefault>
      <Text>SinglePostItemScreen</Text>
      <Button title="goBack" onPress={() => navigation.goBack()} />
      <Text>Post id to update is: {id}</Text>
      <Card>
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
      </Card>
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
      <HardDeletePostItem id={id} />
    </SafeAreaViewDefault>
  );
}
