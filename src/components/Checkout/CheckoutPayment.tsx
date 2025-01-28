import { useContext, useState } from 'react';
import { ServiceContext } from '../../context/serviceContext';
import { useMutation } from '@tanstack/react-query';
import { postOrder } from '../../services/dateService';
import { FinalOrder } from '../utils/types';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const CheckoutPayment = () => {
  const { order } = useContext(ServiceContext);
  const nav = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
  });

  const orders = useMutation({
    mutationKey: ['orders'],
    mutationFn: (obj: FinalOrder) => {
      return postOrder(obj);
    },
    onSuccess: (order) => {
      nav(`/success/${order.id}`);
    },
  });

  if (!order.date || !order.hour) {
    return <div>No order found</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePayment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { name, email, phone } = formValues;
    if (name && email && phone && order.date && order.hour) {
      if (window.confirm(`Confirm order at ${order.date} ${order.hour}`)) {
        orders.mutate({
          ...order,
          user: {
            name,
            email,
            phone,
          },
        });
      }
    }
  };
  return (
    <div className='flex flex-row justify-center'>
      <div className='w-1/4 m-10'>
        <h2>Order details</h2>
        <h3>
          Date: {order.date} - {order.hour}
        </h3>
        <h4>Type: {order.service.type}</h4>
        {order.extras &&
          order.extras.map((e) => (
            <h4 key={e.name}>
              {e.name} - {e.price} €
            </h4>
          ))}
        <h4>Price: {order.price} €</h4>
      </div>
      <div className='w-1/4 m-10'>
        <form className='flex flex-col max-w-64 gap-4' onSubmit={handlePayment}>
          <label>
            Name{' '}
            <input
              className='bg-white text-black'
              name='name'
              value={formValues.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email{' '}
            <input
              className='bg-white text-black'
              name='email'
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone{' '}
            <input
              className='bg-white text-black'
              type='number'
              name='phone'
              value={formValues.phone}
              onChange={handleChange}
            />
          </label>
          <button className='p-1 text-white bg-slate-700 rounded-xs transition cursor-pointer hover:bg-slate-400'>
            test
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPayment;
