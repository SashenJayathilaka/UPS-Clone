import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ModalScreen from "../screens/ModalScreen";
import OrderScreen from "../screens/OrderScreen";
import TabNavigator from "./TabNavigator";

export type RootStackPramList = {
  Main: undefined;
  Mymodal: { userId: string; name: string };
  Order: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackPramList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Mymodal"
          component={ModalScreen}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name="Order" component={OrderScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
