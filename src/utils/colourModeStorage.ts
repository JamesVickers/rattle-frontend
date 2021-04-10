import AsyncStorage from "@react-native-community/async-storage";

// set the new colour theme mode to AsyncStorage each time it’s updated
export const colorThemeStorage = {
  get: async (): Promise<string | null> => {
    return await AsyncStorage.getItem("THEME");
  },
  set: (theme: string): Promise<void> => {
    return AsyncStorage.setItem("THEME", theme);
  },
};
