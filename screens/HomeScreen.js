import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ListItem, Icon, colors, Text } from "react-native-elements";
import { VictoryPie } from "victory-native";

const HomeScreen = ({ navigation }) => {
  const list2 = [
    {
      name: "Breakfast",
      avatar_url: "",
      calories: "00kcal",
      linearGradientColors: ["#FF9800", "#F44336"],
    },
    {
      name: "Lunch",
      avatar_url: "",
      calories: "00kcal",
      linearGradientColors: ["#3F51B5", "#2196F3"],
    },
    {
      name: "Dinner",
      avatar_url: "",
      calories: "00kcal",
      linearGradientColors: ["#FFD600", "#FF9800"],
    },
    {
      name: "Snacks",
      avatar_url: "",
      calories: "00kcal",
      linearGradientColors: ["#4CAF50", "#8BC34A"],
    },
    {
      name: "Water Intake",
      avatar_url: "",
      calories: "00ml",
      linearGradientColors: ["#F44336", "#E91E63"],
    },
    {
      name: "Exercise",
      avatar_url: "",
      calories: "00kcal",
      linearGradientColors: ["#F44336", "#E91E63"],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <VictoryPie
          height={400}
          innerRadius={100}
          startAngle={90}
          endAngle={-90}
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          data={[
            { x: "", y: 35 },
            { x: "", y: 40 },
            { x: "", y: 55 },
          ]}
        />
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.list}>
          {list2.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => navigation.navigate(`${l.name}`)}
            >
              <ListItem.Content>
                <ListItem.Title style={{ color: "red" }}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle>{l.calories}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title right>
                  <Icon
                    name="add-circle-outline"
                    type="ionicon"
                    color="green"
                  />
                </ListItem.Title>
                <Icon name="podium" type="ionicon" color="green" />
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    height: "30%",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
  list: {
    height: "70%",
    marginTop: 20,
    // borderTopWidth: 1,
    // borderColor: colors.greyOutline,
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
});
