import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-assets/slider";
import { useContext, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { GameSetupContext } from "../contexts/GameSetupContext";
import { useRouter } from "expo-router";

export default function GameSetup() {
  const { players, setPlayers } = useContext(GameSetupContext);
  const [newPlayer, setNewPlayer] = useState("");
  const [playerError, setPlayerError] = useState("");
  const { drinking, setDrinking } = useContext(GameSetupContext);
  const {spiceLevel, setSpiceLevel} = useContext(GameSetupContext);
  const router = useRouter();

  const handleNewPlayerChange = (text) => {
    setNewPlayer(text);
  };
  const addPlayer = () => {
    if (newPlayer.length == 0) return;
    if (players.includes(newPlayer)) {
      setPlayerError("Player already exists.");
      return;
    }
    setPlayers((currPlayers) => [...currPlayers, newPlayer]);
    setNewPlayer("");
    setPlayerError("");
  };
  const deletePlayer = (index) => {
    setPlayers((currPlayers) => {
      const filteredPlayers = [...currPlayers];
      filteredPlayers.splice(index, 1);
      return filteredPlayers;
    });
  };

  const toggleDrinking = () => {
    setDrinking(!drinking);
  };

  const handleSpiceLevelChange = (value) => {
    setSpiceLevel(value);
  };

  const startGame = () => {
    if (players.length >= 2) {
      setPlayerError("");
      router.push("/game-play");
    } else {
      setPlayerError("Please add at least 2 players.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add players</Text>
      <TextInput
        value={newPlayer}
        onChangeText={handleNewPlayerChange}
        placeholder="John"
        style={styles.input}
        cursorColor={"black"}
        editable={players.length < 5}
      />
      <Text>{playerError}</Text>
      <Button onPress={addPlayer} title="Add Player" />
      {players.map((player, index) => {
        return (
          <View key={index}>
            <Text>{player}</Text>
            <AntDesign.Button
              onPress={() => deletePlayer(index)}
              name="closecircleo"
              size={24}
              color="black"
            />
          </View>
        );
      })}
      <Text>Drinking</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={drinking ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleDrinking}
        value={drinking}
      />
      <Text>{`Spice level: ${"🌶️".repeat(spiceLevel)}`}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={4}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={spiceLevel}
        onSlidingComplete={handleSpiceLevelChange}
      />
      <Pressable onPress={startGame}>
        <Text>Start Game</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  slider: {
    width: 200,
    height: 40,
    flexGrow: 0,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 120,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
  },
});
