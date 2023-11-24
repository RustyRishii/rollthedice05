import { useCallback } from "react";
import {
  RefreshControl,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { PropsWithChildren, useState } from "react";

import DiceOne from "../assets/One.png";
import DiceTwo from "../assets/Two.png";
import DiceThree from "../assets/Three.png";
import DiceFour from "../assets/Four.png";
import DiceFive from "../assets/Five.png";
import DiceSix from "../assets/Six.png";
import * as Haptics from "expo-haptics";

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

export default function App() {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
        break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        setDiceImage(DiceOne);
        break;
    }
  };

  const colors = [
    "lavender",
    "aliceblue",
    "aqua",
    "beige",
    "brown",
    "cornsilk",
    "crimson",
    "darkcyan",
    "darkorange",
    "turquoise",
  ];

  const [randomColor, setRandomColor] = useState("");

  function getRandomColors() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRandomColors();
    rollDiceOnTap();
    setRandomColor(getRandomColors());
    setTimeout(() => {
      setRefreshing(false);
    }, 20);
  }, []);

  const handleEvent = () => {
    rollDiceOnTap();
    setRandomColor(getRandomColors);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  //function that takes both the function to pass on to the Pressable onPress property

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={{
            alignContent: "center",
            height: "100%",
            backgroundColor: randomColor,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flex: 1,
              //alignItems: "center",
              justifyContent: "center",
              backgroundColor: randomColor,
            }}
          >
            <Dice imageUrl={diceImage} />
            <Pressable onPress={() => handleEvent()}>
              <Text style={styles.rollDiceBtnText}>Roll the dice</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                )
              }
            >
              <Text style={styles.rollDiceBtnText}>Success</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                )
              }
            >
              <Text style={styles.rollDiceBtnText}>Error</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Warning
                )
              }
            >
              <Text style={styles.rollDiceBtnText}>Warning</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Text style={styles.rollDiceBtnText}>Light</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            >
              <Text style={styles.rollDiceBtnText}>Medium</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
              }
            >
              <Text style={styles.rollDiceBtnText}>Heavy</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF2F2",
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#E5E0FF",
    fontSize: 16,
    color: "#8EA7E9",
    fontWeight: "700",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

/*
<View>
        <ScrollView
          style={{
            backgroundColor: randomColor,
            height: "100%",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SafeAreaView>
            <Dice imageUrl={diceImage} />
            <Pressable onPress={() => handleEvent()}>
              <Text
                style={{
                  justifyContent: "center",
                  fontSize: 25,
                  color: "green",
                  alignContent: "center",
                  borderWidth: 1,
                  margin: 10,
                  alignItems: "center",
                  borderRadius: 5,
                  borderColor: "yellow",
                }}
              >
                Roll the dice
              </Text>
            </Pressable>
          </SafeAreaView>
        </ScrollView>
      </View>
*/
