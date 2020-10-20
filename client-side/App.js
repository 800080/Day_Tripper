import React from "react";
import { Provider } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import store from "./store";
import {
  Login,
  HomeScreen,
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
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="CreateTrip" component={CreateTrip} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={() => ({
                headerLeft: null,
              })}
            />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen
              name="AllTrips"
              component={AllTrips}
              options={({ navigation }) => ({
                title: "All Trips",
                headerRight: () => <UserButton navigation={navigation} />,
              })}
            />

            <Stack.Screen
              name="SingleTrip"
              options={({ navigation }) => ({
                title: "All Trips",
                headerRight: () => <UserButton navigation={navigation} />,
              })}
            >
              {() => (
                <Tab.Navigator>
                  <Tab.Screen name="SingleTrip" component={SingleTrip} />
                  <Tab.Screen name="Itinerary" component={Itinerary} />
                  <Tab.Screen name="Chat" component={Chat} />
                  <Tab.Screen name="Guest List" component={GuestList} />
                  <Tab.Screen name="Map" component={Map} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="Event Details" component={SingleEvent} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
