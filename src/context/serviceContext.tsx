import { createContext, PropsWithChildren, useState } from 'react';
import { Service, Order } from '../components/utils/types';

export type OrderContent = {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

export const ServiceContext = createContext<OrderContent>({
  order: {} as Order,
  setOrder: () => {},
});

export const ServiceProvider = (props: PropsWithChildren<object>) => {
  const [order, setOrder] = useState<Order>({
    service: 'Kampaamoleikkaus' as unknown as Service,
    extras: [],
    price: 0,
  });
  return (
    <ServiceContext.Provider value={{ order, setOrder }}>
      {props.children}
    </ServiceContext.Provider>
  );
};
