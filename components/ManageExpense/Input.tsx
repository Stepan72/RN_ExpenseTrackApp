import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";

interface InputProps {
  label: string;
  textInputConfig?: TextInputProps;
  style?: TextStyle;
}

export default function Input({ label, textInputConfig, style }: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
