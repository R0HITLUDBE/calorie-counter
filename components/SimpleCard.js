import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Icon, Text, Button } from "react-native-elements";
import Axios from "axios";
import RecipePage from "./RecipePage";

const SimpleCard = ({ recipe }) => {
  return (
    <View>
      <Card containerStyle={{ width: 170, margin: 8 }}>
        <Card.Image
          style={{ padding: 0, marginBottom: 10 }}
          source={{
            uri: `${recipe.recipe.image}`,
          }}
        />
        <Text bold style={{ marginBottom: 10 }}>
          {recipe["recipe"]["label"]}
        </Text>
        <View style={styles.description}>
          <Text style={{ marginBottom: 10, color: "green" }}>
            {recipe.recipe.calories.toFixed(2)} kcal
          </Text>
          <Button
            title="more info"
            onPress={() => <RecipePage recipe={recipe.recipe} />}
          />
        </View>
      </Card>
    </View>
  );
};

export default SimpleCard;

const styles = StyleSheet.create({
  description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
