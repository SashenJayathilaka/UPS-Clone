import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";

import RootNavigator from "./navigator/RootNavigator";
import utilities from "./tailwind.json";

const client = new ApolloClient({
  uri: "your StepZen deployed URL",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore -TailwindProvider is missing a type defination
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
