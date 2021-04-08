import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { ThemeProvider } from "styled-components/native";
import { get, merge } from "lodash";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParams, useStackNavigatorHeaderOptions } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import AppProvider from "./src/components/AppContext";
import { modes, theme as baseTheme } from "./src/styles/theme";
import { colorModeStorage } from "./src/utils/colourModeStorage";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignOutScreen from "./src/screens/SignOutScreen";
import { useUser } from "./src/components/User";
import ChatTabsNavigation from "./src/ChatTabsNavigation";

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

  const [mode, setMode] = React.useState<string>(modes[0]);

  // Fetch the user’s colour theme mode preference from AsyncStorage and setting it to state
  useEffect(() => {
    async function getMode() {
      const stored = await colorModeStorage.get();
      setMode(stored || "default");
    }
    getMode();
  }, []);

  //  Set the new colour theme mode to AsyncStorage each time it’s updated
  useEffect(() => {
    if (!mode) return;
    colorModeStorage.set(mode);
  }, [mode]);

  const toggleMode = () => {
    const i = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[i]);
  };

  const getTheme = (modeArg: string) =>
    merge({}, baseTheme, {
      colors: get(baseTheme.colors.modes, modeArg, baseTheme.colors),
    });

  const theme = getTheme(mode);

  if (loadingCache) {
    return <Text>Loading App...</Text>;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppProvider mode={mode} toggleMode={toggleMode}>
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

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
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
