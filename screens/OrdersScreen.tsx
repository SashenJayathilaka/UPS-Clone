import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import { Image } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import OrderCard from "../components/OrderCard";
import useOrders from "../hooks/useOrders";
import { RootStackPramList } from "../navigator/RootNavigator";
import { TabStackPramsList } from "../navigator/TabNavigator";

type OrderScreenProps = RouteProp<RootStackPramList, "Order">;

export type OrderScreensNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackPramsList>,
  NativeStackNavigationProp<RootStackPramList, "Order">
>;

const OrdersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreensNavigationProps>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text
          style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}
        ></Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        source={{
          uri: "https://drive.google.com/uc?export=download&id=1STfaOcJrKm6GmkmtA8bafO_BFDUoLGMS",
        }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          onPress={() => setAscending(!ascending)}
          style={tw("py-2 px-5")}
        >
          {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
