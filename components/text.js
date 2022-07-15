import { Text, StyleSheet } from "react-native";

export function SimpleText400(props) {
  return <Text style={styles.regular}>{props.children}</Text>;
}

export function SimpleSubTitle500(props) {
  return <Text style={styles.medium}>{props.children}</Text>;
}
export function SimpleSubTitle600(props) {
  const style = props.centered
    ? [styles.semiBold, styles.centered]
    : styles.semiBold;
  return <Text style={style}>{props.children}</Text>;
}
const styles = StyleSheet.create({
  regular: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    letterSpacing: -0.5,
  },
  centered: {
    textAlign: "center",
  },
  medium: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.55,
  },
  semiBold: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.6,
  },
});
