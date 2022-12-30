type Customer = {
  email: string;
  name: string;
};

type CustomerList = {
  name: ID;
  value: Customer;
};

type Trackingitem = {
  customer_id: ID;
  customer: Customer;
  items: Item[];
};

type Item = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};

type OrderResponce = {
  value: Order;
};

type CustomerResponce = {
  name: ID;
  value: Customer;
};

type Order = {
  Address: string;
  City: string;
  Lat: number;
  Lng: number;
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  trackingitems: Trackingitem;
};
