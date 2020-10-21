import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../store/user'
import { connect } from 'react-redux'
import defaultStyles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  clearState = () => {
    this.setState({
      email: '',
      password: ''
    })
  }

  onFooterLinkPress = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require('../assets/DayTripperLogo.png')}
          />
          <TextInput
            style={defaultStyles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextInput
            style={defaultStyles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={defaultStyles.defaultButton}
            onPress={() => {

              this.props.login(this.state.email, this.state.password, this.props.navigation);
              this.clearState()
            }
            }
          >
            <Text style={defaultStyles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={defaultStyles.footerView}>
            <Text style={defaultStyles.footerText}>
              Don't have an account?{' '}
              <Text onPress={this.onFooterLinkPress} style={defaultStyles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
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
    backgroundColor: '#fdfaec'
  },
  logo: {
    flex: 1,
    height: 150,
    width: 210,
    alignSelf: 'center',
    margin: 30,
    borderRadius: 5
  },
});
