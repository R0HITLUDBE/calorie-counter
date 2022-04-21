import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { CheckBox, Text } from "react-native-elements";

const OnboardingScreen = ({ navigation }) => {
  const [looseweight, setLooseweight] = useState(false);
  const [gainweight, setGainweight] = useState(false);
  const [buildmuscle, setBuildmuscle] = useState(false);

  const [goal, setGoal] = useState(0);

  const [low, setLow] = useState(false);
  const [moderate, setModerate] = useState(false);
  const [high, setHigh] = useState(false);
  const [veryhigh, setVeryhigh] = useState(false);

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
            <>
              <CheckBox
                title="Loose Weight"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={looseweight}
                onPress={() => {
                  setLooseweight(!looseweight);
                  setGainweight(false);
                  setBuildmuscle(false);
                }}
                center={false}
                containerStyle={styles.checkBox}
              />
              <CheckBox
                title="Gain Muscle"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={styles.checkBox}
                center={false}
                checked={gainweight}
                onPress={() => {
                  setLooseweight(false);
                  setGainweight(!gainweight);
                  setBuildmuscle(false);
                }}
              />
              <CheckBox
                title="Build Muscle"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={styles.checkBox}
                center={false}
                checked={buildmuscle}
                onPress={() => {
                  setLooseweight(false);
                  setGainweight(false);
                  setBuildmuscle(!buildmuscle);
                }}
              />
            </>
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
            <>
              <CheckBox
                title="Low"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={low}
                center={false}
                onPress={() => {
                  setLow(!low);
                  setModerate(false);
                  setHigh(false);
                  setVeryhigh(false);
                }}
                containerStyle={styles.checkBox}
              />
              <CheckBox
                title="Moderate"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                center={false}
                containerStyle={styles.checkBox}
                checked={moderate}
                onPress={() => {
                  setLow(false);
                  setModerate(!moderate);
                  setHigh(false);
                  setVeryhigh(false);
                }}
              />
              <CheckBox
                title="High"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                center={false}
                containerStyle={styles.checkBox}
                checked={high}
                onPress={() => {
                  setLow(false);
                  setModerate(false);
                  setHigh(!high);
                  setVeryhigh(false);
                }}
              />
              <CheckBox
                title="Very High"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                center={false}
                containerStyle={styles.checkBox}
                checked={veryhigh}
                onPress={() => {
                  setLow(false);
                  setModerate(false);
                  setHigh(false);
                  setVeryhigh(!veryhigh);
                }}
              />
            </>
          ),
        },
        // page 3
        {
          backgroundColor: "#9AD0EC",
          title: "What's your Gender?",
          subtitle: (
            <>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity>
                  <Image
                    style={{ height: 125, width: 125, borderRadius: 100 }}
                    source={require("../assets/Man-thinking-pana.png")}
                  />
                  <CheckBox
                    title="Very High"
                    checked={veryhigh}
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }}
                    onPress={() => {}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{ height: 125, width: 125, borderRadius: 100 }}
                    source={require("../assets/Woman-thinking-pana.png")}
                  />
                  <Text>Female</Text>
                </TouchableOpacity>
              </View>
            </>
          ),
        },
        // page 4
        {
          backgroundColor: "#FCE38A",
          title: "What's your Height",
          subtitle: <></>,
        },
        // page 5
        {
          backgroundColor: "#AA96DA",
          title: "What's your BirthDate",
          subtitle: <></>,
        },
        // page 6
        {
          backgroundColor: "#EAFFD0",
          title: "What's your Weight",
          subtitle: <></>,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: "#3FC1C9",
    borderRadius: 70,
    width: 250,
  },
});
