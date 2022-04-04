import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header as HeaderRNE, HeaderProps, Icon } from "react-native-elements";
const Header = () => {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={{
          icon: "menu",
          color: "#fff",
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon name="description" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              //   onPress={playgroundNavigate}
            >
              <Icon type="antdesign" name="rocket1" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "Header", style: styles.heading }}
      />
    </SafeAreaProvider>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
