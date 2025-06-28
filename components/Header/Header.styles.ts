// components/Header/Header.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingHorizontal: 20,
    // marginBottom: -10,
  },
  headerButton: {
    padding: 4,
  },
  menuIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
  },
  moreIcon: {
    fontSize: 28,
  },
  statDivider: {
    width: "100%",
    height: 1,
    fontWeight: "light",
  },
});
