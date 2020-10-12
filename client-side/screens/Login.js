import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../store/user'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          {/* <Image
            style={styles.logo}
            source={require('../../../assets/icon.png')}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.login(this.state.email, this.state.password, this.props.navigation)}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          {/* <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View> */}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatch = (dispatch) => ({
  login: (email, password, navigation) => dispatch(auth(email, password, 'login', navigation))
})

export default connect(null, mapDispatch)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
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
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
