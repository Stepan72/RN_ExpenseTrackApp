import { View, Text, FlatList } from "react-native";
import React from "react";
import { SingleExpense } from "../../types";
import { ListRenderItemInfo } from "react-native";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
  expenses: SingleExpense[];
}

function renderExpenseItem(itemData: ListRenderItemInfo<SingleExpense>) {
  return <ExpenseItem expense={itemData.item} />;
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
