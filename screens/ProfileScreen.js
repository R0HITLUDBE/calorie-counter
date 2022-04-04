import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  ListItem,
  Text,
} from "react-native-elements";
import { async } from "@firebase/util";
import { auth, db, logout } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  useEffect(() => {
    const profile = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, "users", auth.currentUser.uid)
        );
        const { name, email } = querySnapshot.data();
        setname(name);
        setemail(email);
      } catch (e) {
        console.log(e);
      }
    };
    profile();
  }, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const list = [
    {
      title: "My Goals",
    },
    {
      title: "Statics",
    },
    {
      title: "Body Measurements",
    },
    {
      title: "Allergy Settings",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            size={80}
            rounded
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ marginTop: 15, marginBottom: 5 }} h4>
              {name}
            </Text>
            <Text>{email}</Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 30,
            marginBottom: 0,
          }}
        >
          <Icon style={{ marginTop: 4 }} type="ionicon" name="person-sharp" />
          <Text style={{ marginLeft: 10 }} h4>
            PERSONAL
          </Text>
        </View>
        <View>
          {list.map((item, i) => (
            <ListItem
              key={i}
              onPress={() => navigation.navigate(`${item.title}`)}
            >
              <Icon name={item.icon} type="ionicon" />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </View>
        <ListItem onPress={handleLogout}>
          <Icon name="log-out-outline" type="ionicon" />
          <ListItem.Content>
            <ListItem.Title>Log out</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  userInfoSection: { paddingHorizontal: 30, marginBottom: 25 },
});
