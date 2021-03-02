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
import UpdatePostScreen from "./src/screens/UpdatePostScreen";

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
  primaryBackground: "palevioletred",
  primaryBackgroundText: "white",
};

const darkTheme: DefaultTheme = {
  primaryBackground: "maroon",
  primaryBackgroundText: "#ddd",
};

// const theme = lightTheme || darkTheme;
const theme = darkTheme || lightTheme;

const App = (): JSX.Element => {
  const [loadingCache, setLoadingCache] = useState(true);

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
      <StatusBar barStyle="dark-content" />
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
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
            name="Posts"
            component={PostsScreen}
            options={{
              ...headerOptions,
              title: "Posts screeeeeen",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="UpdatePost"
            component={UpdatePostScreen}
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
