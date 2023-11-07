import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import React, { useState } from "react";
import CustomButton from "../UI/CustomButton";
import { AddExpenseProps } from "../../store/expenses-context";

interface ExpenseFormProps {
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (expenseData: AddExpenseProps) => void;
}

export default function ExpenseForm({
  isEditing,
  onCancel,
  onSubmit,
}: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const inputChangeHandler = (identifier: string, enteredValue: string) => {
    setInputValues((prevValue) => {
      return {
        ...prevValue,
        [identifier]: enteredValue,
      };
    });
    console.log(identifier, enteredValue);
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => {
              inputChangeHandler("amount", value);
            },
            value: inputValues.amount,
            placeholder: "Amount of expense",
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: (value) => {
              inputChangeHandler("date", value);
            },
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (value) => {
            inputChangeHandler("description", value);
          },
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton
          buttonText="Cancel"
          mode="flat"
          onPress={onCancel}
          style={styles.button}
        />
        <CustomButton
          buttonText={isEditing ? "Update" : "Add"}
          onPress={submitHandler}
          style={styles.button}
        />
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
