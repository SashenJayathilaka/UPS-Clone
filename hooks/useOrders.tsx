import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "../graphql/queries";

const useOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponce) => ({
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingitems: value.trackingitems,
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
    }));

    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export default useOrders;
