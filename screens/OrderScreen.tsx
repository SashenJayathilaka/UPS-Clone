import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackPramList } from "../navigator/RootNavigator";
import { TabStackPramsList } from "../navigator/TabNavigator";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenProps = RouteProp<RootStackPramList, "Order">;

export type OrderScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackPramsList, "Orders">,
  NativeStackNavigationProp<RootStackPramList>
>;

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProps>();
  const {
    params: { order },
  } = useRoute<OrderScreenProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingitems.customer.name,
      headerTintColor: "#EB6A7C",
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
    });
  }, [order]);

  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard order={order} fullWidth={true} />
    </View>
  );
};

export default OrderScreen;
