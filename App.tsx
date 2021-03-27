import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { ThemeProvider, DefaultTheme } from "styled-components/native";
import PostsScreen from "./src/screens/PostsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParams, useStackNavigatorHeaderOptions } from "./src/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import SinglePostScreen from "./src/screens/SinglePostScreen";
import AppProvider from "./src/components/AppContext";

// const Stack = createStackNavigator();
const RootStack = createNativeStackNavigator<RootStackParams>();

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Change uri for production
  uri: "http://localhost:3000/admin/api",
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
});

const lightTheme: DefaultTheme = {
  colours: {
    // black
    font: "#171717",
    // lightGrey
    screen: "#efefef",
    // darkGrey
    icon: "#383838",
    // midGrey
    midGrey: "#cfcfcf",
    // white
    border: "#ffffff",
    // primary
    primary: "#ffe000",
    // lightBlue
    secondary: "#8cd4ff",
    // midBlue
    midBlue: "#71add1",
    // danger
    danger: "#fa2a2a",
  },
};

const darkTheme: DefaultTheme = {
  colours: {
    // white
    font: "#ffffff",
    // darkGrey
    screen: "#383838",
    icon: "#efefef",
    // midGrey
    midGrey: "#cfcfcf",
    // black
    border: "#171717",
    // primary
    primary: "#ffe000",
    // lightBlue
    secondary: "#8cd4ff",
    // midBlue
    midBlue: "#71add1",
    // danger
    danger: "#fa2a2a",
  },
};

// const theme = lightTheme || darkTheme;

const App = (): JSX.Element => {
  const [loadingCache, setLoadingCache] = useState(true);
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <Text>Loading App...</Text>;
  }

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <StatusBar barStyle="dark-content" />
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ThemeProvider>
      </AppProvider>
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
