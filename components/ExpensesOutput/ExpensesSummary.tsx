import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SingleExpense } from "../../types";
import { GlobalStyles } from "../../constants/style";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 18,
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

interface ExpensesSummaryProps {
  periodName: string;
  expenses: SingleExpense[];
}

export default function ExpensesSummary({
  periodName,
  expenses,
}: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
