import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ListItem, Icon, colors, Text } from "react-native-elements";
import { VictoryPie } from "victory-native";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  var Calories = [];

  useEffect(() => {
    const profile = async () => {
      try {
        const breakfast = await getDocs(
          collection(db, "food", auth.currentUser.uid, "breakfast")
        );
        const lunch = await getDocs(
          collection(db, "food", auth.currentUser.uid, "lunch")
        );
        const dinner = await getDocs(
          collection(db, "food", auth.currentUser.uid, "dinner")
        );
        breakfast.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { date, nutrients } = doc.data();
          // console.log(doc.data(), "DATE", date);
          Calories.push(nutrients.ENERC_KCAL.quantity);
        });
        dinner.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { date, nutrients } = doc.data();
          // console.log(doc.data(), "DATE", date);
          Calories.push(nutrients.ENERC_KCAL.quantity);
        });
        lunch.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { date, nutrients } = doc.data();
          // console.log(doc.data(), "DATE", date);
          Calories.push(nutrients.ENERC_KCAL.quantity);
        });
        console.log(Calories.reduce((partialSum, a) => partialSum + a, 0));
      } catch (e) {
        console.log(e);
      }
    };
    profile();
  }, []);

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

  useEffect(() => {
    console.log(auth.currentUser.uid);
  }, []);

  // `${breakfastCal.reduce((partialSum, a) => partialSum + a, 0)}`

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
            {
              x: "breakfast",
              y: "",
            },
            {
              x: "Lunch",
              y: "",
            },
            {
              x: "dinner",
              y: "",
            },
          ]}
        />
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.list}>
          {list2.map((l, i) => (
            <ListItem key={i} onPress={() => navigation.navigate(`${l.name}`)}>
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
