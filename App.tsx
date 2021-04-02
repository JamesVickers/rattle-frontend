import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { ThemeProvider } from "styled-components/native";
import { get, merge } from "lodash";
import PostsScreen from "./src/screens/PostsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParams, useStackNavigatorHeaderOptions } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import AppProvider from "./src/components/AppContext";
import { modes, theme as baseTheme } from "./src/styles/theme";
import { colorModeStorage } from "./src/utils/colourModeStorage";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";

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

  const [mode, setMode] = React.useState<string | null>(modes[0]);

  // Fetch the user’s colour theme mode preference from AsyncStorage and setting it to state
  useEffect(() => {
    async function getMode() {
      const stored = await colorModeStorage.get();
      setMode(stored);
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
  // const isLoggedIn = useCombinedStore((state) => state.login.isLoggedIn);
  const headerOptions = useStackNavigatorHeaderOptions();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
          }}>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              ...headerOptions,
              title: "Home screeeeeen",
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
            name="Posts"
            component={PostsScreen}
            options={{
              ...headerOptions,
              title: "Posts screeeeeen",
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
