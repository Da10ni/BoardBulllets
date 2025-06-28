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
  },
  homeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    letterSpacing: 1,
  },

  // Progress and stats combined section
  progressAndStatsSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 220,
  },

  // Main circular progress
  progressSection: {
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 36,
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

  // Stats container
  statsContainer: {
    justifyContent: "center",
    marginLeft: 30,
    flex: 0,
  },
  statItem: {
    alignItems: "flex-start",
    marginBottom: 15,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    lineHeight: 12,
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
    borderColor: "#ddd",
    borderRadius: 25,
  },
  viewMoreText: {
    fontSize: 12,
    color: "#666",
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
