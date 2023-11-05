import { View, Text } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      periodName="Total"
      expenses={expensesCtx.expenses}
      fallbackText="There is no expenses! Add some!"
    />
  );
}
