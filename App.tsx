import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { ThemeProvider, useTheme } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParams, useStackNavigatorHeaderOptions } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import AppProvider from "./src/components/AppContext";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignOutScreen from "./src/screens/SignOutScreen";
import { useUser } from "./src/components/User";
import ChatTabsNavigation from "./src/ChatTabsNavigation";
import { darkTheme, lightTheme } from "./src/styles/theme";
import { useDarkMode } from "./src/utils/useDarkMode";
import { Text } from "react-native";

// const Stack = createStackNavigator();
const RootStack = createNativeStackNavigator<RootStackParams>();

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Change uri for production
  uri: "http://localhost:3000/admin/api",
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

const App = (): JSX.Element => {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  const { theme, toggleTheme } = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (loadingCache) {
    return <Text style={{ color: "#8cd4ff" }}>Loading App...</Text>;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={themeMode}>
        <AppProvider toggleMode={toggleTheme}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaProvider>
            <Navigation />
            {/* <Button onPress={toggleTheme} title="toggle theme" />
            <Text>theme: {theme}</Text> */}
          </SafeAreaProvider>
        </AppProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

function Navigation(): JSX.Element {
  const user = useUser();
  const headerOptions = useStackNavigatorHeaderOptions();
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.foreground,
          }}>
          {user && (
            <RootStack.Screen
              name="ChatTabs"
              component={ChatTabsNavigation}
              options={{
                ...headerOptions,
                title: "Home screeeeeen",
                headerShown: false,
              }}
            />
          )}
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              ...headerOptions,
              title: "Splash Screen",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              ...headerOptions,
              title: "Sign In Screen",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="SignOut"
            component={SignOutScreen}
            options={{
              ...headerOptions,
              title: "Sign Out Screen",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            options={{
              ...headerOptions,
              title: "Create Account Screen",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="SinglePost"
            component={SinglePostScreen}
            options={{
              ...headerOptions,
              title: "Update Post screen",
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="Chapter"
            component={ChapterScreen}
            options={({
              route: {
                params: {
                  chapter: {number, title},
                },
              },
            }) => ({
              title: number ? `Chapter ${number}: ${title}` : title,
              gestureResponseDistance: {horizontal: 500},
            })}
          /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
