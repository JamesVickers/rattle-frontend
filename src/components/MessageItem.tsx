import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Message } from "../state/message.model";
import { Id } from "../state/types";
import { Card } from "./Card";
import { Text } from "./Text";

export const MessageItem = ({
  message,
  onLongPress,
}: {
  message: Message;
  onLongPress: (selectedmessageId: Id) => void;
}): JSX.Element => {
  return (
    <Card>
      <TouchableOpacity onLongPress={() => onLongPress(message.id)}>
        <Text>{message.text}</Text>
      </TouchableOpacity>
    </Card>
  );
};
