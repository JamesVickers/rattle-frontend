import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Conversation } from "../state/conversation.model";
import { Id } from "../state/types";
import { Card } from "./Card";
import { ProfileImage } from "./ProfileImage";
import { Text } from "./Text";

export const ConversationItem = ({
  conversation,
  onConversationPress,
}: {
  conversation: Conversation;
  onConversationPress?: (selectedConversationId: Id) => void;
}): JSX.Element => {
  console.log(conversation.member.profileImage);
  const cardContent = useMemo(
    () => (
      <>
        <Text>Title: {conversation.title}</Text>
        <View>
          <ProfileImage
            source={
              conversation.member.profileImage?.image.publicUrlTransformed
            }
          />
          <Text>
            Member: {conversation.member.firstName}{" "}
            {conversation.member.lastName}
          </Text>
        </View>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversation.member.firstName, conversation.member.lastName],
  );

  return onConversationPress ? (
    <Card>
      <TouchableOpacity onPress={() => onConversationPress(conversation.id)}>
        {cardContent}
      </TouchableOpacity>
    </Card>
  ) : (
    <Card>{cardContent}</Card>
  );
};
