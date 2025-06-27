// components/Header/Header.styles.ts
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:25,
    paddingHorizontal: 20,
    // marginBottom: -10,
    backgroundColor: Colors.background.primary,
  },
  headerButton: {
    padding: 4,
  },
  menuIcon: {
    fontSize: 22,
    color: Colors.text.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 1,
  },
  moreIcon: {
    fontSize: 28,
    color: Colors.text.primary,
  },
  statDivider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.primary ,
    fontWeight: "light",
  },
});
