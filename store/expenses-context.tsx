import { createContext } from "react";
import React, { useState } from "react";
import { SingleExpense } from "../types";
import { DUMMY_EXPENSES } from "../constants/dummyExpenses";

interface AddExpenseProps {
  amount: number;
  description: string;
  date: Date;
}

export const ExpensesContext = createContext({
  expenses: [] as SingleExpense[],
  addExpense: ({ description, amount, date }: AddExpenseProps) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: AddExpenseProps
  ) => {},
});

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, setExpensesState] =
    useState<SingleExpense[]>(DUMMY_EXPENSES);

  function addExpense({ description, amount, date }: AddExpenseProps) {
    setExpensesState((prevValue) => {
      const newId = (Math.random() * 100).toFixed(0);

      return [...expensesState, { description, amount, date, id: newId }];
    });
  }

  function deleteExpense(id: string) {
    setExpensesState((prevValue) => {
      const filteredExpenseState = expensesState.filter((el) => {
        return el.id !== id;
      });
      return [...filteredExpenseState];
    });
  }

  function updateExpense(
    id: string,
    { description, amount, date }: AddExpenseProps
  ) {
    const updatebleExpenseIndex = expensesState.findIndex((el) => {
      return (el.id = id);
    });
    const updatebleExpense = expensesState[updatebleExpenseIndex];
    const updatedExpense = {
      ...updatebleExpense,
      description: description,
      amount: amount,
      date: date,
    };
    const filteredExpenseState = expensesState.filter((el) => {
      return el.id !== id;
    });
    setExpensesState((prevValue) => {
      return [...filteredExpenseState, updatedExpense];
    });
  }

  const contextValue = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
