import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import CustomButton from "./CustomButton";

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}

export default function ErrorOverlay({
  message,
  onConfirm,
}: ErrorOverlayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton buttonText="Okay" onPress={onConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
