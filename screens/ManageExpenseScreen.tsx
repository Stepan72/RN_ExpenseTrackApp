import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SingleExpense, StackParamList } from "../types";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { AddExpenseProps } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/axios";
import LoadingOverlay from "../components/UI/LoadingOverlay";

type ManageExpenseScreenProps = NativeStackScreenProps<
  StackParamList,
  "ManageExpense"
>;

export default function ManageExpenseScreen({
  route,
  navigation,
}: ManageExpenseScreenProps) {
  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  const [isLoading, setIsLoading] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  const selectedExpense = expensesCtx.expenses.find(
    (el) => el.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? `Edit Expense` : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    expensesCtx.deleteExpense(expenseId);
    await deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (
    expenseData: SingleExpense | AddExpenseProps
  ) => {
    setIsLoading(true);
    if (isEditing) {
      console.log("check IDDD", expenseId);
      expensesCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
