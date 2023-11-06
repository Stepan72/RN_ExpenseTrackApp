import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import CustomButton from "../components/UI/CustomButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

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

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? `Edit Expense` : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    navigation.goBack();
    expensesCtx.deleteExpense(expenseId);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: "TestUpdate",
        amount: 1,
        date: new Date(),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 1,
        date: new Date(),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttonsContainer}>
        <CustomButton
          buttonText="Cancel"
          mode="flat"
          onPress={cancelHandler}
          style={styles.button}
        />
        <CustomButton
          buttonText={isEditing ? "Update" : "Add"}
          onPress={confirmHandler}
          style={styles.button}
        />
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
