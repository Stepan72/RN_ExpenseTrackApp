import { View, Text } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((el) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return el.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallbackText="There is no recent expenses!"
    />
  );
}
