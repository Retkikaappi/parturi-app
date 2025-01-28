import { useContext, useState } from 'react';
import { ServiceContext } from '../../context/serviceContext';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../../services/dateService';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { order, setOrder } = useContext(ServiceContext);
  const [date, setDate] = useState<string | null>(null);
  const nav = useNavigate();
  const calendar = useQuery({
    queryKey: ['calendar'],
    queryFn: getAll,
    retry: 2,
  });

  const toCheckout = (hour: string) => {
    if (
      window.confirm('Are you sure you want to proceed to checkout?') &&
      date
    ) {
      console.log(order);
      setOrder({
        ...order,
        date,
        hour,
      });
      nav('/checkout/payment');
    }
  };

  const pickedDate = () => {
    if (calendar.data) {
      const filtered = calendar.data.find((e) => e.date === date);
      if (filtered) {
        return (
          <div className='flex flex-col gap-2 mt-4'>
            {filtered.hours.map((e) =>
              e.available ? (
                <div
                  key={e.hour}
                  className='flex justify-end border-1 border-green-400'
                >
                  <p className='font-semibold m-auto'>{e.hour}</p>
                  <button
                    onClick={() => toCheckout(e.hour)}
                    className='bg-green-700 p-1 ml-4 w-30 transition cursor-pointer hover:bg-green-400'
                  >
                    Choose
                  </button>
                </div>
              ) : (
                <div key={e.hour} className='flex justify-end'>
                  <p className='font-semibold m-auto'>{e.hour}</p>
                  <button className='bg-slate-900 p-1 ml-4 w-30' disabled>
                    Reserved
                  </button>
                </div>
              )
            )}
          </div>
        );
      }
    }
    if (calendar.isLoading) {
      return <div className='animate-bounce mt-4'>Loading</div>;
    }
    return <div className='mt-4'>No dates found</div>;
  };

  return (
    <div className='flex flex-row justify-center'>
      <div className='m-10'>
        Order: {order.service.type} {order.price} €
        <ul>
          {order.extras &&
            order.extras.map((e) => (
              <li key={e.name}>
                {e.name} - {e.price} €
              </li>
            ))}
        </ul>
      </div>
      <div className='m-10'>
        Pick a date
        <input
          type='date'
          className='ml-4'
          onChange={({ target }) => setDate(target.value)}
        />
        {pickedDate()}
      </div>
    </div>
  );
};

export default Checkout;
