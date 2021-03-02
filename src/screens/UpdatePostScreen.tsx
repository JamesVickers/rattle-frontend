import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { POST_ITEM_QUERY } from "../queries/PostItemQuery";
import { RootStackParams } from "../routes";

export default function UpdatePostcreen(): JSX.Element {
  const route = useRoute<RouteProp<RootStackParams, "UpdatePost">>();
  const { id } = route.params;

  const {
    data,
    // loading, error
  } = useQuery(POST_ITEM_QUERY, {
    variables: { id },
  });

  console.log("UpdatePostItem data: ", data);

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

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
      {/* <TextInput
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
      /> */}
      <Button title="Update" onPress={() => undefined} />
    </SafeAreaView>
  );
}
