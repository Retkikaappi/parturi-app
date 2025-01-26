import { Outlet } from 'react-router-dom';
import NLink from '../NLink';

const Booking = () => {
  return (
    <div className='flex justify-center'>
      <div className='p-1 m-1 flex flex-col w-1/8 h-full border-2 border-slate-500'>
        <NLink to={'/booking/haircuts'} text={'Haircuts'} />
        <NLink to={'/booking/styling'} text={'Styling'} />
      </div>
      <Outlet />
    </div>
  );
};

export default Booking;
