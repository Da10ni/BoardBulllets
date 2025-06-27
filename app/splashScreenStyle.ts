import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },

  // Fixed white background - never moves
  whiteBackground: {
    position: "absolute",
    top: -180,
    left: 50,
    width: 50,
    height: 490,
    backgroundColor: "white",
    transform: [{ skewY: `-40deg` }, { translateY: 70 }, { translateX: -20 }],
    transformOrigin: "top left",
    borderRadius: 340,
  },

  // Fixed header - never moves
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textAlign: "right",
  },

  // Fixed top logo - never moves
  topLogoContainer: {
    position: "absolute",
    top: 90,
    left: 30,
    zIndex: 20,
  },
  topLogoText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  // Carousel container - only this area moves
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 190,
  },

  // Individual carousel item
  carouselItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  // Logo screen styles
  mainLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logoText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },

  // Feature screen styles
  iconContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.3,
    fontWeight: "400",
  },

  // Fixed bottom section - never moves
  bottomSection: {
    position: "absolute",
    bottom: 40,
    left: 30,
    right: 30,
    alignItems: "center",
  },

  // Dots indicator
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },

  // Fixed auth buttons - never move
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 2,
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "white",
    flex: 1,
    marginRight: 10,
  },
  loginText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  signupButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  signupText: {
    color: "#4A90E2",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
});
