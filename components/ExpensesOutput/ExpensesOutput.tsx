import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { SingleExpense } from "../../types";
import { GlobalStyles } from "../../constants/style";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

interface ExpensesOutputProps {
  expenses: SingleExpense[];
  periodName: string;
  fallbackText: string;
}

export default function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}
