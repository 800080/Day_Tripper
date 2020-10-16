import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

function HomeScreen({ navigation, user }) {
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
    </View>
  );
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(HomeScreen);

const styles = StyleSheet.create({
  logo: {
    height: 180,
    width: 260,
    borderRadius: 5,
    margin: 20
  },
});
