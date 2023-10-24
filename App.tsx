import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackParamList, TabsParamList } from "./types";
import AllExpensesScreen from "./screens/AllExpensesScreen";

const Stack = createNativeStackNavigator<StackParamList>();
const BottomTab = createBottomTabNavigator<TabsParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllExpenses" component={AllExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
