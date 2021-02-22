import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript';

export type RootStackParams = {
  Home: undefined;
  Second: undefined;
};

export function useStackNavigatorHeaderOptions(): Partial<NativeStackNavigationOptions> {
  return {
    headerStyle: {
      backgroundColor: '#8f5656',
    },
    headerTintColor: '#b5baf5',
    headerHideShadow: true,
    headerTitleStyle: {
      color: '#f720e9',
    },
  };
}
