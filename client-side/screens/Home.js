import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { accessibilityProps } from 'react-native-paper';
import { connect } from 'react-redux';
import { logout } from '../store';

function HomeScreen({ navigation, user, logout }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.logo}
        source={require('../assets/DayTripperLogo.png')}
      />
      <Text>Welcome {user.name}!</Text>
      <Button
        title="View Trips"
        onPress={() => navigation.navigate('AllTrips')}
      />
      <Button
        title="User Profile"
        onPress={() => navigation.navigate('UserProfile')}
      />
      <Button
        title="Logout"
        onPress={() => logout(navigation)}
      />
    </View>
  );
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  logout: navigation => dispatch(logout(navigation))
})

export default connect(mapState, mapDispatch)(HomeScreen);

const styles = StyleSheet.create({
  logo: {
    height: 180,
    width: 260,
    borderRadius: 5,
    margin: 20
  },
});
