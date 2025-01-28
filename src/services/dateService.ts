import axios from 'axios';
import { Calendar, FinalOrderResponse, Order } from '../components/utils/types';

export const getAll = async (): Promise<Calendar[]> => {
  const { data } = await axios.get<Calendar[]>(
    'http://localhost:3001/calendar'
  );
  return data;
};

export const postOrder = async (obj: Order) => {
  const resp = await axios.post<FinalOrderResponse>(
    'http://localhost:3001/orders',
    obj
  );
  return resp.data;
};

export const getFinalOrder = async (id: string) => {
  const { data } = await axios.get<FinalOrderResponse>(
    `http://localhost:3001/orders/${id}`
  );
  return data;
};
