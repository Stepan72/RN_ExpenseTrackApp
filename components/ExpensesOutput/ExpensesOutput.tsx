import { View, Text } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface ExpensesOutputProps {
  expenses: string;
}

export default function ExpensesOutput({ expenses }: ExpensesOutputProps) {
  return (
    <View>
      <ExpensesSummary />
      <ExpensesList />
    </View>
  );
}
