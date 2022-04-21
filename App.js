import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BreakfastScreen from "./screens/BreakfastScreen";
import RecipeScreen from "./screens/RecipeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "./firebase";
import LunchScreen from "./screens/LunchScreen";
import { Icon } from "react-native-elements";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RecipeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen name="Breakfast" component={BreakfastScreen} />
      <HomeStack.Screen name="Lunch" component={LunchScreen} />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const RecipeStackScreen = () => {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen name="Recipes" component={RecipeScreen} />
    </RecipeStack.Navigator>
  );
};

export default function App() {
  const currentUser = useAuth();
  console.log(currentUser);
  if (currentUser)
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Recipe") {
                iconName = focused ? "restaurant" : "restaurant-outline";
              } else if (route.name === "Profile") {
                iconName = focused
                  ? "person-circle-sharp"
                  : "person-circle-outline";
              }

              // You can return any component that you like here!
              return (
                <Icon
                  name={iconName}
                  size={size}
                  type="ionicon"
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Recipe" component={RecipeStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="On" component={OnboardingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  else
    return (
      <NavigationContainer>
        <Stack.Navigator
          // screenOptions={globalScreenOption}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/* <Stack.Navigator
        // screenOptions={globalScreenOption}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator> */
