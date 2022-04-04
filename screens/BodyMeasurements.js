import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const BodyMeasurements = () => {
  useEffect(() => {
    const bodymeasurements = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, "users", auth.currentUser.uid)
        );
        const { height, weight } = querySnapshot.data();
        setHeight(height);
        setWeight(weight);
      } catch (e) {
        console.log(e);
      }
    };
    bodymeasurements();
  }, []);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Height</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{height} cm</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Weight</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{weight} kg</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Calculated BMI</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title>{}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default BodyMeasurements;

const styles = StyleSheet.create({});
