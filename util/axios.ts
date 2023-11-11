import axios from "axios";

import { AddExpenseProps } from "../store/expenses-context";
import { SingleExpense } from "../types";

const BACKEND_URL =
  "https://rn-expensetrackapp-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData: AddExpenseProps) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name as string;
  console.log(id);
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];
  console.log(response.data);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id: string, expenseData: AddExpenseProps) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
