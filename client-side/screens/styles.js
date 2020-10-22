import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  mainView: {
    backgroundColor: '#fdfaec',
    height: '100%'
  },
  button: {
    backgroundColor: '#ee964b',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderRadius: 5,
    borderColor: '#d3d3d3',
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    paddingRight: 16
  },
  input: {
    height: 48,
    borderColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fdfaec',
  },
  buttonTitle: {
    color: '#2e2e2d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: '#ee964b'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#f95738',
    fontWeight: 'bold',
    fontSize: 16,
  },
  singleContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})