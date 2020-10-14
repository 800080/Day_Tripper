import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux'

function HomeScreen({ navigation, user }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome {user.name}!</Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title="Go to SingleTrip 1"
        onPress={() => navigation.navigate('SingleTrip')}
      />
    </View>
  );
}

const mapState = (state) => ({
  user: state.user
})

export default connect(mapState)(HomeScreen)
