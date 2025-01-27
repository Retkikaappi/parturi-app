import { useContext, useState } from 'react';
import NLink from '../NLink';
import { extras } from '../utils/extras';
import { Service } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../context/serviceContext';

const Radio = ({
  name,
  service,
  setService,
  price,
}: {
  name: string;
  service: Service;
  setService: () => void;
  price: string;
}) => (
  <div className='py-1 flex flex-row justify-between'>
    <label className=''>{name}</label>
    <p>{price} €</p>
    <div className='flex flex-row mx-6'>
      <input
        className='w-6 cursor-pointer'
        type='radio'
        value={name}
        checked={name === service.type}
        onChange={setService}
      />
    </div>
  </div>
);

const BookingHaircuts = () => {
  const { setOrder } = useContext(ServiceContext);
  const [service, setService] = useState<Service>({ type: 'Kampaamoleikkaus' });
  const [extraServices, setExtraServices] = useState<boolean[]>(
    new Array(extras.length).fill(false)
  );
  const [total, setTotal] = useState<number>(0);
  const nav = useNavigate();

  const handleCheck = (pos: number) => {
    const updatedServices = extraServices.map((e, index) =>
      index === pos ? !e : e
    );
    setExtraServices(updatedServices);

    setTotal(
      updatedServices.reduce(
        (sum, state, index) =>
          state === true ? sum + extras[index].price : sum,
        0
      )
    );
  };

  const checkDisable = (index: number) => {
    if (service.type === 'Koneajo') {
      return index === 4 ? true : false;
    }

    if (service.type === 'Lasten hiustenleikkaus') {
      return index === 3 || index === 2 ? true : false;
    }

    return false;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const additions = extras.filter(
      (e, index) => extraServices[index] === true && e
    );
    nav('/checkout');
    switch (service.type) {
      case 'Kampaamoleikkaus':
        setOrder({
          service,
          extras: additions,
          price: 28 + total,
        });
        break;
      case 'Parturileikkaus':
        setOrder({
          service,
          extras: additions,
          price: 20 + total,
        });
        break;
      case 'Lasten hiustenleikkaus':
        setOrder({
          service,
          extras: additions,
          price: 15 + total,
        });
        break;
      case 'Koneajo':
        setOrder({
          service,
          extras: additions,
          price: 12 + total,
        });
        break;
      default: {
        const _never: never = service.type;
        throw new Error(`${_never} error`);
      }
    }
  };

  return (
    <div className='p-1 m-auto flex flex-col w-1/3 h-full border-2 border-slate-500'>
      <div className='w-1/1 mx-auto my-4'>
        <NLink to='/booking' text='Go back' end={true} />
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-row flex-wrap p-4 justify-center'
      >
        <div className='flex flex-col flex-wrap w-1/2 content-start'>
          <Radio
            name='Kampaamoleikkaus'
            service={service}
            setService={() => setService({ type: 'Kampaamoleikkaus' })}
            price='28'
          />
          <Radio
            name='Parturileikkaus'
            service={service}
            setService={() => setService({ type: 'Parturileikkaus' })}
            price='20'
          />
          <Radio
            name='Lasten hiustenleikkaus'
            service={service}
            setService={() => setService({ type: 'Lasten hiustenleikkaus' })}
            price='15'
          />
          <Radio
            name='Koneajo'
            service={service}
            setService={() => setService({ type: 'Koneajo' })}
            price='12'
          />
        </div>
        <div className='w-1/2'>
          {extras.map((e, index) => (
            <div key={index} className='flex flex-row py-1'>
              <label className='mr-4'>{e.name}</label>
              <p>{e.price} €</p>
              <input
                className='mx-4 w-6 cursor-pointer'
                type='checkbox'
                value={e.name}
                name={e.name}
                onChange={() => handleCheck(index)}
                disabled={checkDisable(index)}
              />
            </div>
          ))}
        </div>
        <div className='w-1/1 my-4'>Extras cost: {total} €</div>
        <div className='w-1/1'>
          <button
            type='submit'
            className='m-1 p-1 bg-slate-700 rounded-sm hover:bg-gray-600 transition max-w-40'
          >
            Proceed to checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingHaircuts;
