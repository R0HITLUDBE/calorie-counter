import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Headline, Subheading } from "react-native-paper";

const RecipePage = ({ route }) => {
  const { recipeImage, recipeName } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          height: 200,
          width: "100%",
          overflow: "hidden",
          marginBottom: 10,
        }}
        source={{ uri: `${recipeImage}` }}
      />
      <Subheading>{recipeName}</Subheading>
    </SafeAreaView>
  );
};

export default RecipePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
