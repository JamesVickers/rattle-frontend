import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatTabsParams } from "./routes";
import HomeScreen from "./screens/HomeTab";
import ProfileTab from "./screens/ProfileTab";
import SearchTab from "./screens/SearchTab";

const ChatTabs = createBottomTabNavigator<ChatTabsParams>();

export default function ChatTabsNavigation(): JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      <ChatTabs.Navigator
        tabBarOptions={{
          // activeTintColor: theme.foreground.tabBarActive,
          // activeBackgroundColor: theme.colour.tabBarActive,
          // inactiveTintColor: theme.foreground.tabBar,
          // inactiveBackgroundColor: theme.colour.tabBar,
          style: {
            // backgroundColor: theme.colour.tabBar,
            // borderTopColor: theme.colour.divider,
            height: safeAreaInsets.bottom + 64,
          },
          labelStyle: { paddingBottom: 8 },
          tabStyle: { paddingTop: 2 },
          safeAreaInsets,
          keyboardHidesTabBar: Platform.OS === "android",
        }}>
        <ChatTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                // <HomeSvgActive width={tabIconSpacing} height={tabIconSpacing} />
                <Text>Home y</Text>
              ) : (
                <Text>Home n</Text>
              );
            },
          }}
        />
        <ChatTabs.Screen
          name="Search"
          component={SearchTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? <Text>Search y</Text> : <Text>Search n</Text>;
            },
          }}
        />
        <ChatTabs.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? <Text>Profile y</Text> : <Text>Profile n</Text>;
            },
          }}
        />
      </ChatTabs.Navigator>
    </>
  );
}
