/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styled, {ThemeProvider, DefaultTheme} from 'styled-components/native';
import LikeSvg from './src/images/like.svg';

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
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <ThemeProvider theme={theme}>
            <StyledLikeSvg style={{color: 'red'}} />
            <Header />
            {((global as unknown) as Record<string, unknown>).HermesInternal ==
            null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <StyledBackground>
              <StyledText>STYLISH</StyledText>
            </StyledBackground>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change
                  this screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ThemeProvider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
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
