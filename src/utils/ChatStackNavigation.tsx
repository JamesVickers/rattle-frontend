import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";
import { ChatStackParams } from "../routes";
import ChatTabsNavigation from "../ChatTabsNavigation";
import SinglePostScreen from "../screens/SinglePostScreen";

const ChatStack = createNativeStackNavigator<ChatStackParams>();

export default function ChatStackNavigation(): JSX.Element {
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
      </ChatStack.Navigator>
      {/* <LockScreen /> */}
    </>
  );
}
