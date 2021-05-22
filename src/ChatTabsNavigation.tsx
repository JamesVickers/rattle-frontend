import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { ChatTabsParams } from "./routes";
import SettingsSvg from "./images/settings.svg";
import HomeSvg from "./images/home-outline.svg";
import SearchSvg from "./images/search-outline.svg";
import PersonSvg from "./images/person-circle-outline.svg";
import { SettingsTab } from "./screens/SettingsTab";
import { HomeTab } from "./screens/HomeTab";
import { ProfileTab } from "./screens/ProfileTab";
import { SearchTab } from "./screens/SearchTab";
import { IconCircleBackground } from "./components/IconCircleBackground";

const ChatTabs = createBottomTabNavigator<ChatTabsParams>();

export const ChatTabsNavigation = (): JSX.Element => {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const iconSize = 40;
  const iconStrokeWidth = 20;
  const iconBackgroundColour = "secondary";

  return (
    <>
      <ChatTabs.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={HomeTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <IconCircleBackground background={iconBackgroundColour}>
                  <HomeSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "tabActive" : "tabInactive"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </IconCircleBackground>
              );
            },
          }}
        />
        <ChatTabs.Screen
          name="Search"
          component={SearchTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <IconCircleBackground background={iconBackgroundColour}>
                  <SearchSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "tabActive" : "tabInactive"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </IconCircleBackground>
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
                <IconCircleBackground background={iconBackgroundColour}>
                  <PersonSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "tabActive" : "tabInactive"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </IconCircleBackground>
              );
            },
          }}
        />
        <ChatTabs.Screen
          /******************************************************************
           *** TODO: Update tab content to Settings as used to be HomeOld ***
           *****************************************************************/
          name="Settings"
          component={SettingsTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <IconCircleBackground background={iconBackgroundColour}>
                  <SettingsSvg
                    width={iconSize}
                    height={iconSize}
                    stroke={theme.colors[focused ? "tabActive" : "tabInactive"]}
                    strokeWidth={iconStrokeWidth}
                    // fill={theme.colors.primary}
                  />
                </IconCircleBackground>
              );
            },
          }}
        />
      </ChatTabs.Navigator>
    </>
  );
};
