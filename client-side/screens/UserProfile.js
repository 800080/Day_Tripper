import React, { Component } from 'react'
import { Text, StyleSheet, Image, View, Button, TouchableOpacity } from 'react-native'
import { List, Divider } from 'react-native-paper'
import { connect } from 'react-redux'
import { logout } from '../store';
import defaultStyles from './styles'

class UserProfile extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={defaultStyles.singleContainer}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/windows/452/person-male.png' }} />

        <List.Section style={styles.list}>
          <Text style={defaultStyles.text}>Name: {this.props.user.name}</Text>
          <Divider style={defaultStyles.divider} />
          <Text style={defaultStyles.text}>Username: {this.props.user.username}</Text>
          <Divider style={defaultStyles.divider} />
          <Text style={defaultStyles.text}>Email: {this.props.user.email}</Text>
        </List.Section>

        <TouchableOpacity
          title="Logout"
          style={{ ...defaultStyles.button, width: 125 }}
          onPress={() => this.props.logout(this.props.navigation)}
        >
          <Text style={(defaultStyles.buttonTitle)}>Log out</Text>
        </TouchableOpacity>


      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.user
})

const mapDispatch = (dispatch) => ({
  logout: navigation => dispatch(logout(navigation))
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
  view: {
    flex: 1,
    alignItems: 'center'
  },
})

export default connect(mapState, mapDispatch)(UserProfile)
