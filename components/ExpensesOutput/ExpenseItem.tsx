import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SingleExpense } from "../../types";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../types";

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});

interface ExpenseItemProps {
  expense: SingleExpense;
}

type Props = NativeStackScreenProps<StackParamList, "ManageExpense">;
type ExpenseItemNavigationProp = Props["navigation"];

export default function ExpenseItem({
  expense: { id, description, amount, date },
}: ExpenseItemProps) {
  const navigation = useNavigation<ExpenseItemNavigationProp>();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      description,
      amount,
      date,
      id,
    });
  };

  return (
    <TouchableOpacity onPress={expensePressHandler}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.description, styles.textBase]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
