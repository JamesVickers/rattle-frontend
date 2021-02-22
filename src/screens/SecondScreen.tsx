import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {RootStackParams} from '../routes';
// import {RootStackParams} from '../routes';

const SecondScreen = (): JSX.Element => {
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
      }}>
      <Text>SecondScreen!!</Text>
      <Button
        title="go to HomeScreen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </SafeAreaView>
  );
};

export default SecondScreen;
