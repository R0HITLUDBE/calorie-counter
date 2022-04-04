import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Image, Text } from "react-native-elements";
import { signIn } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    try {
      await signIn(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require("../assets/Pasta-pana.png")}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
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
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={() => Login()}
        title="Login"
      />
      <Text
        onPress={() => navigation.navigate("Register")}
        style={{
          marginTop: 18,
        }}
      >
        Don't have an account? Register
      </Text>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
