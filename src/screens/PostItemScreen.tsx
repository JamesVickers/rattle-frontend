import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View, Button } from "react-native";
import { RootStackParams } from "../routes";

const POST_ITEM_QUERY = gql`
  query {
    Post(where: { id: "602e81986e52282eda8fb576" }) {
      id
      title
      body
      status
    }
  }
`;

export default function PostItemScreen(): JSX.Element {
  const { data, loading, error } = useQuery(POST_ITEM_QUERY);

  console.log({ data, loading, error });

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <Text>Post Item screen</Text>
      <Button title="goBack" onPress={() => navigation.goBack()} />
    </View>
  );
}
