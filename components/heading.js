import { Text, StyleSheet } from "react-native";

export function SmallHeading(props) {
  return <Text style={styles.small}>{props.children}</Text>;
}

export function MediumHeading(props) {
  const style = props.colored ? [styles.medium, styles.iris100] : styles.medium;
  return <Text style={style}>{props.children}</Text>;
}
export function LargeHeading(props) {
  const style = props.centered ? [styles.large, styles.centered] : styles.large;
  return <Text style={style}>{props.children}</Text>;
}
export function HomeHeading(props) {
  const style = props.colored ? [styles.home, styles.iris100] : styles.home;
  return <Text style={style}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  small: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  home: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    letterSpacing: -0.75,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iris100: {
    color: "#5D5FEF",
  },
  centered: {
    textAlign: "center",
  },
  medium: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 22,

    letterSpacing: -1.05,
  },
  large: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    letterSpacing: -1,
  },
});
