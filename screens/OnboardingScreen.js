import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Text, Icon } from "react-native-elements";
import { RadioButton, TextInput } from "react-native-paper";
import { AuthContext } from "../components/AuthProvider";

const OnboardingScreen = ({ navigation }) => {
  const context = useContext(AuthContext);
  const { goal, setGoal } = context;
  const { activityLevel, setActivityLevel } = context;
  const { gender, setGender } = context;
  const { height, setHeight } = context;
  const { weight, setWeight } = context;

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  return (
    <Onboarding
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#95E1D3",
          image: (
            <Image
              style={{ height: 250, width: 250 }}
              source={require("../assets/Running-amico.png")}
            />
          ),
          title: "What's your goal",
          subtitle: (
            <RadioButton.Group
              onValueChange={(value) => setGoal(value)}
              value={goal}
            >
              <RadioButton.Item
                style={styles.checkBox}
                mode="ios"
                value="loose weight"
                label="loose weight"
              />
              <RadioButton.Item
                style={styles.checkBox}
                mode="ios"
                value="gain weight"
                label="gain weight"
              />
              <RadioButton.Item
                style={styles.checkBox}
                mode="ios"
                value="build muscle"
                label="build muscle"
              />
            </RadioButton.Group>
          ),
        },
        // page 2
        {
          backgroundColor: "#EAFFD0",
          image: (
            <Image
              style={{ height: 250, width: 250 }}
              source={require("../assets/Mindfulness-pana.png")}
            />
          ),
          title: "What's your activity level",
          subtitle: (
            <View style={{ width: "50%" }}>
              <RadioButton.Group
                onValueChange={(value) => setActivityLevel(value)}
                value={activityLevel}
              >
                <RadioButton.Item
                  style={styles.checkBox}
                  mode="ios"
                  value="low"
                  label="low"
                />
                <RadioButton.Item
                  mode="ios"
                  style={styles.checkBox}
                  value="moderate"
                  label="moderate"
                />
                <RadioButton.Item
                  mode="ios"
                  style={styles.checkBox}
                  value="high"
                  label="high"
                />
                <RadioButton.Item
                  mode="ios"
                  style={styles.checkBox}
                  value="very high"
                  label="very high"
                />
              </RadioButton.Group>
            </View>
          ),
        },
        // page 3
        {
          backgroundColor: "#9AD0EC",
          title: "What's your Gender?",
          subtitle: (
            <>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setGender("Male")}>
                  <Image
                    style={{
                      height: 125,
                      width: 125,
                      borderRadius: 100,
                    }}
                    source={require("../assets/Man-thinking-pana.png")}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {gender === "Male" ? (
                      <Icon type="ionicon" name="checkmark" />
                    ) : null}
                    <Text>Male</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => setGender("Female")}
                >
                  <Image
                    style={{ height: 125, width: 125, borderRadius: 100 }}
                    source={require("../assets/Woman-thinking-pana.png")}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {gender === "Female" ? (
                      <Icon type="ionicon" name="checkmark" />
                    ) : null}
                    <Text>Female</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ),
        },
        // page 4
        {
          backgroundColor: "#FCE38A",
          title: "What's your Height",
          subtitle: (
            <KeyboardAvoidingView
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "23%",
                marginBottom: 60,
              }}
            >
              <TextInput
                style={{ height: 50 }}
                mode="outlined"
                value={height}
                onChangeText={(text) => setHeight(text)}
              />
              <Text h4>cm</Text>
            </KeyboardAvoidingView>
          ),
        },
        // page 5
        {
          backgroundColor: "#EAFFD0",
          title: "What's your Weight",
          subtitle: (
            <KeyboardAvoidingView
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "23%",
                marginBottom: 60,
              }}
            >
              <TextInput
                style={{ height: 50 }}
                mode="outlined"
                value={weight}
                onChangeText={(text) => setWeight(text)}
              />
              <Text h4>kg</Text>
            </KeyboardAvoidingView>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  checkBox: {
    width: 250,
  },
});
