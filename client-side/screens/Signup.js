import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, logout } from '../store/user';
import { connect } from 'react-redux';
import defaultStyles from './styles'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onRegisterPress = async () => {
    const { name, username, email, password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
    } else if (!email.includes("@") || !email.includes(".")) {
      alert('Email is not valid!')
    } else if (username === "") {
      alert('Username is required!')
    } else if (name === "") {
      alert('Name is required!')
    } else {
      await this.props.signup(name, username, email, password, this.props.navigation)
    }

    if (this.props.error && this.props.error.response) {
      alert(`${this.props.error.response.data}. Please sign in.`)
      this.props.removeUser(this.props.navigation)
    }
  };

  onFooterLinkPress = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
          <TextInput
            style={defaultStyles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextInput
            style={defaultStyles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            autoCapitalize="none"
          />
          <TextInput
            style={defaultStyles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            autoCapitalize="none"
          />
          <TextInput
            style={defaultStyles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            autoCapitalize="words"
          />
          <TextInput
            style={defaultStyles.input}
            placeholder="Username"
            placeholderTextColor="#aaaaaa"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={defaultStyles.button}
            onPress={() => this.onRegisterPress()}
          >
            <Text style={defaultStyles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
          <View style={defaultStyles.footerView}>
            <Text style={defaultStyles.footerText}>
              Already got an account?{' '}
              <Text onPress={this.onFooterLinkPress} style={defaultStyles.footerLink}>
                Log in
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatch = (dispatch) => ({
  signup: (name, username, email, password, navigation) =>
    dispatch(auth(email, password, 'signup', navigation, name, username)),
  removeUser: (navigation) => dispatch(logout(navigation))
});

const mapState = (state) => ({
  error: state.user.error
})

export default connect(mapState, mapDispatch)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fdfaec',
  },
});
