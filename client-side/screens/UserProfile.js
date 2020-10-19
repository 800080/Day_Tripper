import React, { Component } from 'react'
import { Text, StyleSheet, Image, View } from 'react-native'
import { List } from 'react-native-paper'
import { connect } from 'react-redux'

class UserProfile extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.view}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/windows/452/person-male.png' }} />

        <List.Section style={styles.list}>
          <Text style={styles.text}>Name: {this.props.user.name}</Text>
          <Text style={styles.text}>Username: {this.props.user.username}</Text>
          <Text style={styles.text}>Email: {this.props.user.email}</Text>
        </List.Section>
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.user
})

const styles = StyleSheet.create({
  icon: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    color: 'white',
    alignSelf: "flex-start",
    marginLeft: 20
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center'
  },
})

export default connect(mapState)(UserProfile)
