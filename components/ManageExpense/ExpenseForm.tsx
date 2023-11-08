import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import React, { useState } from "react";
import CustomButton from "../UI/CustomButton";
import { AddExpenseProps } from "../../store/expenses-context";
import { SingleExpense } from "../../types";
import { getFormattedDate } from "../../util/date";

interface ExpenseFormProps {
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (expenseData: AddExpenseProps) => void;
  defaultValues?: SingleExpense;
}

export default function ExpenseForm({
  isEditing,
  onCancel,
  onSubmit,
  defaultValues,
}: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChangeHandler = (identifier: string, enteredValue: string) => {
    setInputValues((prevValue) => {
      return {
        ...prevValue,
        [identifier]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      Alert.alert("Input is Invalid!", "Please check input values!");
    }
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
            placeholder: "YYYY-MM-DD",
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
