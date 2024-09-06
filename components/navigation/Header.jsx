import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

export default function Header({ screenName }) {
  return (
    <View style={styles.headerContainer}>
      {screenName !== "home" && (
        <Link href="/" asChild>
          <Pressable style={styles.leftIcon}>
            <AntDesign name="home" size={30} color="#FFEB3B" />
          </Pressable>
        </Link>
      )}
      <Text style={styles.headerText}>Truth or Dare</Text>
      <View style={styles.buttonContainer}>
        {screenName === "game-play" && (
          <>
            <Link href="/game-setup" asChild>
              <Pressable style={styles.icon}>
                <MaterialCommunityIcons
                  name="restart"
                  size={30}
                  color="#03DAC6"
                />
              </Pressable>
            </Link>
            {/* Link to instructions page */}
            <Pressable style={styles.icon}>
              <Feather name="info" size={30} color="#03DAC6" />
            </Pressable>
          </>
        )}
        {screenName === "game-setup" && (
          <Pressable style={styles.icon}>
            <Feather name="info" size={30} color="#03DAC6" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: "#6200EE",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#FFEB3B",
    textAlign: "center",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  leftIcon: {
    marginRight: 15,
  },
  icon: {
    marginLeft: 15,
  },
});
