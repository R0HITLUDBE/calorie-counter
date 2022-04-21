import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Icon,
  Input,
  ListItem,
  Overlay,
  SearchBar,
  SpeedDial,
} from "react-native-elements";
import Axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

const LunchScreen = () => {
  const APP_ID = "2d70a1fd";
  const APP_KEY = "210a31c6688d94318813fca4e37caea3";
  const [breakfast, setBreakfast] = useState([]);
  const [healthOption, setHealthOption] = useState(null);
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState("");
  const [foodId, setFoodId] = useState("");
  const [nutrients, setNutrients] = useState();

  // const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=Indian&more=True`;

  var options = {
    method: "GET",
    url: "https://api.edamam.com/api/food-database/v2/parser",
    params: {
      ingr: query,
      app_id: APP_ID,
      app_key: APP_KEY,
      from: 1,
      to: 40,
      health: healthOption,
    },
  };

  var ingredientsOptions = {
    method: "POST",
    url: "https://api.edamam.com/api/food-database/v2/nutrients",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    params: {
      app_id: APP_ID,
      app_key: APP_KEY,
    },
    data: {
      ingredients: [
        {
          quantity: 100,
          foodId: foodId,
        },
      ],
    },
  };

  const getFoodInfo = async () => {
    var result = await Axios.request(options)
      .then((result) => {
        setBreakfast(result.data.hints);
        // console.log(result.data.hints);
      })
      .catch((error) => console.error(error));
  };

  const getNutrientsInfo = async (response) => {
    var result = await Axios.request(ingredientsOptions)
      .then((result) => {
        setNutrients(result.data.totalNutrients);
        console.log("nutrients", result.data);
      })
      .then(async () => {
        try {
          const docRef = await addDoc(collection(db, "breakfast"), {
            label: response.food.label,
            uri: response.food.image,
            nutrients: nutrients,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    const fetchbreakfast = async () => {
      try {
        const breakfastList = [];
        const querySnapshot = await getDocs(collection(db, "breakfast"));
        querySnapshot.forEach((doc) => {
          console.log("doc data uri", doc.data().uri);
          const { label, uri, nutrients } = doc.data();
          breakfastList.push({
            label: label,
            uri: uri,
            nutrients: nutrients.ENERC_KCAL.quantity.toFixed(2),
          });
        });
        setSelected(breakfastList);
        console.log(breakfastList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchbreakfast();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SearchBar
          placeholder="Type Here..."
          platform="android"
          lightTheme
          onChangeText={(text) => setQuery(text)}
          value={query}
          onClear={() => setBreakfast([])}
          onSubmitEditing={() => getFoodInfo()}
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
      </View>
      <ScrollView>
        {query && breakfast !== []
          ? breakfast.map((response) => {
              return (
                <ListItem bottomDivider key={response.food.foodId}>
                  <Avatar source={{ uri: response.food.image }} />
                  <ListItem.Content>
                    <ListItem.Title>{response.food.label}</ListItem.Title>
                    <ListItem.Subtitle>
                      {response.food.nutrients.ENERC_KCAL.toFixed(2)} kcal
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle right>
                    <Icon
                      name="add-circle-outline"
                      type="ionicon"
                      color="#517fa4"
                      onPress={async () => {
                        setFoodId(response.food.foodId);
                        getNutrientsInfo(response);
                      }}
                    />
                  </ListItem.Subtitle>
                </ListItem>
              );
            })
          : selected?.map((response) => {
              return (
                <ListItem bottomDivider key={response.id}>
                  <Avatar source={{ uri: response.uri }} />
                  <ListItem.Content>
                    <ListItem.Title>{response.label}</ListItem.Title>
                    <ListItem.Subtitle>
                      {response.nutrients} kcal
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
      </ScrollView>
    </View>
  );
};

export default LunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
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
