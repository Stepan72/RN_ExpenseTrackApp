import { createContext } from "react";
import React, { useState } from "react";
import { SingleExpense } from "../types";
import { DUMMY_EXPENSES } from "../constants/dummyExpenses";

export interface AddExpenseProps {
  amount: number;
  description: string;
  date: Date;
}

export const ExpensesContext = createContext({
  expenses: [] as SingleExpense[],
  setExpense: (expenses: SingleExpense[]) => {},
  addExpense: ({ description, amount, date, id }: SingleExpense) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: AddExpenseProps
  ) => {},
});

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, setExpensesState] = useState<SingleExpense[]>([]);

  function addExpense({ description, amount, date, id }: SingleExpense) {
    setExpensesState((prevValue) => {
      //   const newId = (Math.random() * 100).toFixed(0);

      return [...expensesState, { description, amount, date, id }].sort(
        (a, b) => {
          return a.date.getTime() - b.date.getTime();
        }
      );
    });
  }

  function setExpense(expense: SingleExpense[]) {
    const sortedInvertExpense = expense.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    setExpensesState(sortedInvertExpense);
    // setExpensesState(expense);
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
    updatedId: string,
    { description, amount, date }: AddExpenseProps
  ) {
    // console.log(updatedId);
    const updatebleExpenseIndex = expensesState.findIndex(
      (el) => el.id == updatedId
    );
    // console.log(updatebleExpenseIndex);
    // console.log(expensesState);
    const updatebleExpense = expensesState[updatebleExpenseIndex];
    // console.log(updatebleExpense);
    const updatedExpense = {
      ...updatebleExpense,
      description: description,
      amount: amount,
      date: date,
    };
    // console.log(updateExpense);
    const filteredExpenseState = expensesState.filter((el) => {
      return el.id !== updatedId;
    });
    // console.log(filteredExpenseState);
    setExpensesState((prevValue) => {
      return [...filteredExpenseState, updatedExpense].sort((a, b) => {
        return a.date.getDate() - b.date.getDate();
      });
    });
  }

  const contextValue = {
    expenses: expensesState,
    addExpense,
    setExpense,
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
