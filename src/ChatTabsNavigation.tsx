import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { ChatTabsParams } from "./routes";
import HomeSvg from "./images/home-outline.svg";
import SearchSvg from "./images/search-outline.svg";
import PersonSvg from "./images/person-circle-outline.svg";
import HomeScreen from "./screens/HomeTab";
import ProfileTab from "./screens/ProfileTab";
import SearchTab from "./screens/SearchTab";

const ChatTabs = createBottomTabNavigator<ChatTabsParams>();

export default function ChatTabsNavigation(): JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const iconSize = 40;
  const iconStrokeWidth = 20;

  return (
    <>
      <ChatTabs.Navigator
        tabBarOptions={{
          showLabel: false,
          // activeTintColor: theme.foreground.tabBarActive,
          // activeBackgroundColor: theme.colour.tabBarActive,
          // inactiveTintColor: theme.foreground.tabBar,
          // inactiveBackgroundColor: theme.colour.tabBar,
          style: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.background,
            height: safeAreaInsets.bottom + 50,
          },
          // labelStyle: { paddingBottom: 8 },
          // tabStyle: { paddingTop: 2 },
          safeAreaInsets,
          keyboardHidesTabBar: Platform.OS === "android",
        }}>
        <ChatTabs.Screen
          name="Search"
          component={SearchTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.secondary,
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.circle,
                  }}>
                  <SearchSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "icon" : "background"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </View>
              );
            },
          }}
        />
        <ChatTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.secondary,
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.circle,
                  }}>
                  <HomeSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "icon" : "background"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </View>
              );
            },
          }}
        />
        <ChatTabs.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.secondary,
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.circle,
                  }}>
                  <PersonSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "icon" : "background"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </View>
              );
            },
          }}
        />
      </ChatTabs.Navigator>
    </>
  );
}
