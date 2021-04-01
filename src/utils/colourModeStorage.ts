import AsyncStorage from "@react-native-community/async-storage";

// set the new colour theme mode to AsyncStorage each time it’s updated
export const colorModeStorage = {
  get: async (): Promise<string | null> => {
    return await AsyncStorage.getItem("MODE");
  },
  set: (mode: string): Promise<void> => {
    return AsyncStorage.setItem("MODE", mode);
  },
};
