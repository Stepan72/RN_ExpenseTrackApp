import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { SingleExpense } from "../../types";
import { GlobalStyles } from "../../constants/style";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    amount: 59.99,
    description: "A pair of shoes",
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    amount: 39.29,
    description: "A pair of trousers",
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    amount: 5.99,
    description: "Some Bananas",
    date: new Date("2021-12-02"),
  },
  {
    id: "e5",
    amount: 29.99,
    description: "Losk",
    date: new Date("2022-02-16"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

interface ExpensesOutputProps {
  expenses?: SingleExpense[];
  periodName: string;
}

export default function ExpensesOutput({
  expenses,
  periodName,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
