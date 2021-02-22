/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {persistCache} from 'apollo3-cache-persist';
import styled, {ThemeProvider, DefaultTheme} from 'styled-components/native';
import LikeSvg from './src/images/like.svg';
import SecondScreen from './src/screens/SecondScreen';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParams} from './src/routes';

// const Stack = createStackNavigator();
const RootStack = createNativeStackNavigator<RootStackParams>();

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const lightTheme: DefaultTheme = {
  primaryBackground: 'palevioletred',
  primaryBackgroundText: 'white',
};

const darkTheme: DefaultTheme = {
  primaryBackground: 'maroon',
  primaryBackgroundText: '#ddd',
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
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Second"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
          }}>
          <RootStack.Screen
            name="Second"
            component={SecondScreen}
            options={{title: '📖 The GraphQL Guide'}}
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
        <StatusBar barStyle="dark-content" />
        <ThemeProvider theme={theme}>
          <SafeAreaView>
            <View>
              <StyledLikeSvg style={{color: 'red'}} />

              <StyledBackground>
                <StyledText>STYLISH</StyledText>
              </StyledBackground>
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const StyledBackground = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.primaryBackground};
`;
const StyledText = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.primaryBackgroundText};
`;
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.primaryBackgroundText};
`;

export default App;
