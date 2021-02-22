import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import { Button, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import LikeSvg from '../images/like.svg';
import { RootStackParams } from '../routes';
// import {RootStackParams} from '../routes';

export const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, 'Second'>
  >();
  return (
    <SafeAreaView
      forceInset={{
        left: 'always',
        top: 'always',
        right: 'always',
        bottom: 'always',
      }}
      style={{ backgroundColor: 'yellow' }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>HomeScreen!!</Text>
        <Button
          title="go to SecondScreen"
          onPress={() => {
            navigation.navigate('Second');
          }}
        />
        <StyledLikeSvg style={{ color: 'red' }} />
        <StyledBackground>
          <StyledText>STYLISH</StyledText>
        </StyledBackground>
      </View>
    </SafeAreaView>
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
