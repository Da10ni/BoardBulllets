import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },

  // Home section
  homeSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  homeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4864AC",
    letterSpacing: 1,
  },

  // Combined Progress and Stats Section
  progressAndStatsSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 220,
  },

  // Left side - Progress Circle
  leftProgressSection: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  // Right side - Stats Column
  rightStatsSection: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 20,
  },

  // Main circular progress
  progressSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  mainCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mainCircleCenterText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  mainCircleNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  mainCircleLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    letterSpacing: 1,
  },

  // New center stats styles for the main circle
  centerStatsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  centerStatItem: {
    alignItems: "center",
    marginVertical: 2,
  },
  centerStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  centerStatPercentage: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  centerDivider: {
    width: 20,
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 3,
  },
  centerLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Stats container - Original styles (kept for compatibility)
  statsContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    alignItems: "flex-start",
    flex: 1,
    marginBottom: 15,
  },

  // New column stats styles
  statItemColumn: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statPercentage: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
   statLabel: {
    fontSize: 10,
    color: "#666",
    marginRight:  "auto",
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 12,
    maxWidth: 100,
  },
  correctStat: {
    color: "#4ECDC4",
  },
  incorrectStat: {
    color: "#FF6B6B",
  },

  // View more button
  viewMoreButton: {
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
  },
  viewMoreText: {
    fontSize: 12,
    color: "#4864AC",
    fontWeight: "500",
    letterSpacing: 0.5,
  },

  // Stat circles
  statCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCircleContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCircle: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  statCircleCenterText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  statCirclePercentage: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  statCircleLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    lineHeight: 14,
  },

  // Action buttons
  actionButtonsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  actionButtonsRow: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  actionButtonIcon: {
    marginBottom: 8,
  },
  actionButtonLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  actionButtonBorderRight: {
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
  },
  actionButtonBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});