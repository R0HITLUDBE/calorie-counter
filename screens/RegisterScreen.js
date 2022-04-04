import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Button, Text, Input } from "react-native-elements";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../components/AuthProvider";
import { async } from "@firebase/util";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthContext);
  const { goal, activityLevel, gender, height, weight } = context;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  useEffect(() => {
    console.log("details", goal, activityLevel, gender, height, weight);
  }, [name]);

  const register = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        return setDoc(doc(db, "users", cred.user.uid), {
          name: name,
          email: email,
          gender: gender,
          height: height,
          weight: weight,
          activityLevel: activityLevel,
          goal: goal,
        });
      });
    } catch (err) {}
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          label="Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={() => register()}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
