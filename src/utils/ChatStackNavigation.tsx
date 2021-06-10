import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";
import { ChatStackParams } from "../routes";
import { ChatTabsNavigation } from "../ChatTabsNavigation";
import { SingleConversationScreen } from "../screens/SingleConversationScreen";
import { EditConversationScreen } from "../screens/EditConversationScreen";

const ChatStack = createNativeStackNavigator<ChatStackParams>();

export const ChatStackNavigation = (): JSX.Element => {
  return (
    <>
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="ChatTabs"
          component={ChatTabsNavigation}
          options={{ title: "Home", headerShown: false }}
        />
        <ChatStack.Screen
          name="SingleConversation"
          component={SingleConversationScreen}
          options={{
            title: "Single Conversation screen",
            headerShown: false,
          }}
        />
        <ChatStack.Screen
          name="EditConversation"
          component={EditConversationScreen}
          options={{
            title: "Edit Conversation screen",
            headerShown: false,
          }}
        />
      </ChatStack.Navigator>
      {/* <LockScreen /> */}
    </>
  );
};
