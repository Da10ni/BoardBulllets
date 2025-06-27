// HomeScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
  },
  headerButton: {
    padding: 4,
  },
  menuIcon: {
    fontSize: 20,
    color: Colors.text.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 1,
  },
  moreIcon: {
    fontSize: 20,
    color: Colors.text.primary,
  },
  homeSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  homeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  progressview: {
    flex: 1,
    flexDirection: 'row',
  },
  progressSection: {
    paddingVertical: 30,
    marginLeft:20,
  },
  statsRow: {
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },
  statPercentage: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.secondary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewMoreText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  spacer: {
    height: 20,
  },

  // Icon Grid Specific
  iconGrid: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    height: 120,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  cellLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  centerBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  centerBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
