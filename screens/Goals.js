import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Goals = () => {
  useEffect(() => {
    const bodymeasurements = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, "users", auth.currentUser.uid)
        );
        const { weight, goal, activityLevel } = querySnapshot.data();
        setgoal(goal);
        setWeight(weight);
        setactivityLevel(activityLevel);
      } catch (e) {
        console.log(e);
      }
    };
    bodymeasurements();
  }, []);
  const [goal, setgoal] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setactivityLevel] = useState("");

  return (
    <View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Goal</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>
            {goal.charAt(0).toUpperCase() + goal.slice(1)}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Starting weight</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{weight} kg</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Target weight</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{} kg</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Activity Level</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>
            {activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1)}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Height</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{} cm</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({});
