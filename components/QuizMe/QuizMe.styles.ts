// QuizMe.styles.ts
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

  // Timer Section Styles
  timerSection: {
    //position: "absolute",
    bottom:20,
    marginVertical:"77%",
    backgroundColor: Colors.background.secondary || '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    gap: 40,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border || '#E9ECEF',
  },
  activeIconContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  timedLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 30,
    letterSpacing: 1,
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  timeOption: {
    marginHorizontal: 25,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  selectedTimeOption: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '300',
    color:'#ADB5BD',
    textAlign: 'center',
  },
  selectedTimeText: {
    color: Colors.primary,
    fontWeight: '400',
  },
  startQuizButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startQuizButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Existing Styles
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