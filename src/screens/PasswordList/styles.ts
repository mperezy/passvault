import { StyleSheet } from 'react-native';
import { appColors } from 'utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  items: {
    margin: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    position: 'absolute',
    alignItems: 'center',
    fontSize: 45,
    color: '#C0C0C0',
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButtonContainer: {
    justifyContent: 'center',
    backgroundColor: '#E13333',
    width: '78%',
    padding: 6,
    marginTop: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  navButton: {
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
  },

  fab: {
    position: 'absolute',
    margin: 26,
    right: 0,
    backgroundColor: appColors.primary,
  },
});

export default styles;
