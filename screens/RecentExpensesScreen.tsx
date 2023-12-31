import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/axios";
import { SingleExpense } from "../types";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
LoadingOverlay;

export default function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState<SingleExpense[]>([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError("Couldn't fetch expenses! ");
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  /// Context store data
  const recentExpensesCtx = expensesCtx.expenses.filter((el) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return el.date > date7DaysAgo;
  });

  ///// Firebase backend data
  // const recentExpensesAxios = fetchedExpenses.filter((el) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);
  //   return el.date > date7DaysAgo;
  // });

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpensesCtx}
      fallbackText="There is no recent expenses!"
    />
  );
}
