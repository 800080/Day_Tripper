import React from "react";
import { Provider } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import store from "./store";
import {
  Login,
  Chat,
  AllTrips,
  SingleTrip,
  Itinerary,
  SingleEvent,
  CreateEvent,
  Signup,
  CreateTrip,
  GuestList,
  Map,
  UserProfile,
} from "./screens";
import "./socket";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  function UserButton({ navigation }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfile")}
        style={{ marginRight: 12 }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://img.icons8.com/windows/452/person-male.png",
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0d3b66',
              },
              headerTitleStyle: {
                color: 'white',
              }
            }}
          >
            <Stack.Screen name="Login"
              component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="CreateTrip" component={CreateTrip} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen
              name="AllTrips"
              component={AllTrips}
              options={({ navigation }) => ({
                title: "All Trips",
                headerLeft: null,
                headerRight: () => <UserButton navigation={navigation} />,
              })}
            />

            <Stack.Screen
              name="SingleTrip"
              options={({ navigation }) => ({
                title: "Single Trip",
                headerRight: () => <UserButton navigation={navigation} />,
              })}
            >
              {() => (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'SingleTrip') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Itinerary') {
                        iconName = 'ios-calendar';
                      } else if (route.name === 'Chat') {
                        iconName = 'ios-chatbubbles';
                      } else if (route.name === 'Guest List') {
                        iconName = 'md-people';
                      } else if (route.name === 'Map') {
                        iconName = 'ios-compass'
                      }
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size * 1.6} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: '#ee964b',
                    inactiveTintColor: 'gray',
                    showLabel: false,
                    style: {
                      height: 100
                    }
                  }}
                >
                  <Tab.Screen name="SingleTrip" component={SingleTrip} />
                  <Tab.Screen name="Itinerary" component={Itinerary} />
                  <Tab.Screen name="Chat" component={Chat} />
                  <Tab.Screen name="Guest List" component={GuestList} />
                  <Tab.Screen name="Map" component={Map} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Event Details"
              component={SingleEvent}
              options={({ navigation }) => ({
                title: "Event",
                headerRight: () => <UserButton navigation={navigation} />,
              })}
            />
            <Stack.Screen name="Create Event" component={CreateEvent} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
