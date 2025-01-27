import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Booking from './components/Booking';
import BookingOrder from './components/BookingOrder';
import BookingHaircuts from './components/Booking/BookingHaircuts';
import BookingStyling from './components/Booking/BookingStyling';
import NLink from './components/NLink';
import Checkout from './components/Checkout';
import { ServiceProvider } from './context/serviceContext';
import CheckoutPayment from './components/Checkout/CheckoutPayment';
import Success from './components/Success';

function App() {
  return (
    <div className='m-auto text-center min-h-screen text-white'>
      <div className='m-auto py-2 w-2/3 flex gap-4 h-40 justify-center'>
        <img src='https://images.pexels.com/photos/7750120/pexels-photo-7750120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7f/Hair_salon_photoshoot_%2850845412511%29.jpg' />
        <img src='https://images.pexels.com/photos/7750109/pexels-photo-7750109.jpeg' />
      </div>
      <div className='p-1 text-lg border-2 border-slate-700 w-2/3 m-auto flex justify-center'>
        <NLink to={'/'} text={'Home'} />
        <NLink to={'/booking'} text={'Booking'} />
        <NLink to={'/contact'} text={'Contact'} />
      </div>
      <ServiceProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/booking/haircuts' element={<BookingHaircuts />} />
          <Route path='/booking/styling' element={<BookingStyling />} />
          <Route path='/booking/order' element={<BookingOrder />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/payment' element={<CheckoutPayment />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </ServiceProvider>
    </div>
  );
}

export default App;

