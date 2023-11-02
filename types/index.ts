export type StackParamList = {
  ManageExpense: {
    id: string;
  };
  ExpensesOverview: undefined;
};

export type TabsParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type SingleExpense = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};
