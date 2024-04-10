import pacifiScanTheme from "../src/custom_theme/theme";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Platform } from "react-native";

const setStatusBar = () => {
    if (Platform.OS === "android") {
      const backgroundColorModal = pacifiScanTheme.colors.brand.pbackground;

      setBackgroundColorAsync(backgroundColorModal);
      setStatusBarBackgroundColor(backgroundColorModal);
    }

    return () => {
      if (Platform.OS === "android") {
        const backgroundColorApp = pacifiScanTheme.colors.brand.appColor;
        setBackgroundColorAsync(backgroundColorApp);
        setStatusBarBackgroundColor(backgroundColorApp);
      }
    };
}

export { setStatusBar}