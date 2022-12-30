import { useQuery } from "@apollo/client";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "@rneui/base";
import { Input } from "@rneui/themed";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import CustomerCard from "../components/CustomerCard";
import { GET_CUSTOMERS } from "../graphql/queries";
import { RootStackPramList } from "../navigator/RootNavigator";
import { TabStackPramsList } from "../navigator/TabNavigator";

export type CustomersScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackPramsList, "Customers">,
  NativeStackNavigationProp<RootStackPramList>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProps>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image
        source={{
          uri: "https://drive.google.com/uc?export=download&id=1cvuqfWbF_aTrYwwCMsWXWPhlp8ihEQ97",
        }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponce) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomersScreen;
