import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";
import { ChatStackParams } from "../routes";
import { ChatTabsNavigation } from "../ChatTabsNavigation";
import { SinglePostScreen } from "../screens/SinglePostScreen";
import { SingleConversationScreen } from "../screens/SingleConversationScreen";

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
          name="SinglePost"
          component={SinglePostScreen}
          options={{
            title: "Single Post screen",
            headerShown: false,
          }}
        />
        <ChatStack.Screen
          name="SingleConversation"
          component={SingleConversationScreen}
          options={{
            title: "Single Conversation screen",
            headerShown: false,
          }}
        />
      </ChatStack.Navigator>
      {/* <LockScreen /> */}
    </>
  );
};
