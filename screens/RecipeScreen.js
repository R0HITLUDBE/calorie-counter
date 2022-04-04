import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SimpleCard from "../components/SimpleCard";
import { Input, Text, SearchBar, Card, Button } from "react-native-elements";
import Axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import RecipePage from "../components/RecipePage";
import { useNavigation } from "@react-navigation/native";

const data = [
  { label: "Alcohol-free", value: "alcohol-free" },
  { label: "Immune-Supportive", value: "immuno-supportive" },
  { label: "Celery-free", value: "celery-free" },
  { label: "Crustcean-free", value: "crustacean-free" },
  { label: "No-sugar", value: "low-sugar" },
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Gluten free", value: "gluten-free" },
  { label: "Keto", value: "keto-friendly" },
  { label: "Kidney friendly", value: "kidney-friendly" },
  { label: "	Kosher", value: "kosher" },
  { label: "Low potassium", value: "low-potassium" },
  { label: "	Lupine-free", value: "lupine-free" },
  { label: "Mustard-free", value: "mustard-free" },
  { label: "Soy free", value: "soy-free" },
  { label: "No oil added", value: "No-oil-added" },
];

const RecipeScreen = ({ navigation }) => {
  const APP_ID = "649cb008";
  const APP_KEY = "04796101597a3f030b3136e77d1e0837";
  const [recipes, setRecipes] = useState([]);
  const [healthOption, setHealthOption] = useState(null);
  const [query, setQuery] = useState("");
  // const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  var options = {
    method: "GET",
    url: "https://api.edamam.com/search",
    params: {
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY,
      from: 1,
      to: 40,
      health: healthOption,
    },
  };

  const getRecipeInfo = async () => {
    var result = await Axios.request(options).then((result) => {
      setRecipes(result.data.hits);
      console.log(result.data.hits);
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        platform="android"
        lightTheme
        onChangeText={(text) => setQuery(text)}
        value={query}
        onClear={() => setRecipes([])}
        onSubmitEditing={() => getRecipeInfo()}
      />
      <View style={{ display: "flex" }}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Add filter"
          searchPlaceholder="Search..."
          value={healthOption}
          onChange={(item) => {
            setHealthOption(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
      </View>

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {recipes !== [] ? (
            recipes.map((recipe) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Recipe page", {
                      recipeImage: recipe.recipe.image,
                      recipeName: recipe.recipe.label,
                      recipeSource: recipe.recipe.source,
                      recipeIngredients: recipe.recipe.ingredientLines,
                    })
                  }
                >
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
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>recipe</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    display: "flex",
  },

  dropdown: {
    margin: 16,
    height: 50,

    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
