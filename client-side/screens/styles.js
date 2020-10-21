import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainView: {
    backgroundColor: '#fdfaec',
    height: '100%'
  },
  defaultButton: {
    backgroundColor: '#ee964b',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonTitle: {
    color: '#2e2e2d',
    fontSize: 16,
    fontWeight: 'bold',
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
})
