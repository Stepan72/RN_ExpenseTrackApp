import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import React from "react";

export default function ExpenseForm() {
  const amountChangeHandler = () => {};

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
            placeholder: "Amount of expense",
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: () => {},
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 80,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
    minHeight: 30,
    marginBottom: 6,
  },
});
