import axios from 'axios';
import { Calendar, FinalOrder, Order } from '../components/utils/types';

export const getAll = async (): Promise<Calendar[]> => {
  const { data } = await axios.get('http://localhost:3001/calendar');
  return data as Promise<Calendar[]>;
};

export const postOrder = async (obj: Order): Promise<FinalOrder> => {
  const resp = await axios.post('http://localhost:3001/orders', obj);
  return resp.data as Promise<FinalOrder>;
};
