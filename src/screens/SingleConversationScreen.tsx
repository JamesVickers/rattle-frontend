import { useMutation, useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { Card } from "../components/Card";
import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { ChatStackParams } from "../routes";
import { useForm } from "../utils/useForm";
import { Outer } from "../components/Outer";
import { CONVERSATION_ITEM_QUERY } from "../queries/ConversationItemQuery";
import { UPDATE_CONVERSATION_MUTATION } from "../queries/UpdateConversationMutation";
import { HardDeleteConversationItem } from "../components/HardDeleteConversationItem";
import { ALL_CONVERSATIONS_QUERY } from "../components/AllConversationsQuery";

export const SingleConversationScreen = (): JSX.Element => {
  const route = useRoute<RouteProp<ChatStackParams, "SingleConversation">>();
  const { id } = route.params;
  const navigation = useNavigation<
    StackNavigationProp<ChatStackParams, "SingleConversation">
  >();

  const {
    data,
    loading,
    // error
  } = useQuery(CONVERSATION_ITEM_QUERY, {
    variables: { id },
  });

  const [
    updateConversation,
    {
      data: updateData,
      error: updateError,
      // loading: updateLoading
    },
  ] = useMutation(UPDATE_CONVERSATION_MUTATION);

  const { inputs, handleChange, clearIndividualKey } = useForm({
    title: data?.Conversation.title,
  });

  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>SingleConversationItemScreen</Text>
        <Button title="goBack" onPress={() => navigation.goBack()} />
        <Text>Conversation id to update is: {id}</Text>
        <Card>
          <TextInput
            value={inputs.title}
            handleChange={handleChange}
            name={"title"}
            placeholder={"Add the conversation title"}
            clearValue={clearIndividualKey}
          />
        </Card>
        <Button
          title="Update"
          onPress={async () => {
            try {
              // const res =
              const res = await updateConversation({
                variables: {
                  id: id,
                  title: inputs.title,
                  refetchQueries: [
                    {
                      query: ALL_CONVERSATIONS_QUERY,
                      // can pass variables to the refetchQuery here is needed
                      // variables: { }
                    },
                  ],
                },
              });
              console.log("updateConversation res: ", res);
            } catch {
              console.error("updateConversation error: ", updateError);
            }
          }}
        />
        <HardDeleteConversationItem id={id} />
      </Outer>
    </SafeAreaViewDefault>
  );
};
